package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeLeaveService employeeLeaveService;
    @Autowired
    private DateService dateService;
    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private JWTUtils jwtutils;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AttendanceService attendanceService;


    public List<LeaveDTO> getLeavesRecordRoleBased(String token) {

        // Get active employees based on role
        List<EmployeeDTO> activeEmployees = employeeService.getActiveEmployeesBasedOnRole(token);

        // Extract active employee IDs
        List<String> activeEmployeeIds = activeEmployees.stream()
                .map(EmployeeDTO::getId)
                .collect(Collectors.toList());

        List<Leave> leaves = new ArrayList<>();

        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the logged-in employee details
        Employee manager = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if ("Admin".equals(roleName)) {
            // Admin: Get all OT records for active employees
            leaves = leaveRepository.findAll().stream()
                    .filter(leave -> activeEmployeeIds.contains(leave.getEmployee().getId()))
                    .collect(Collectors.toList());

        } else if ("Manager".equals(roleName)) {
            // Manager: Get OT records where they are assigned as the manager, only for active employees
            leaves = leaveRepository.findByManagerId(manager.getId()).stream()
                    .filter(leave -> activeEmployeeIds.contains(leave.getEmployee().getId()))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList(); // Other roles don't have access
        }

        // Convert to DTO and return
        return leaves.stream()
                .map(leave -> new LeaveDTO(leave, leave.getEmployee(), leave.getManager()))
                .collect(Collectors.toList());
    }

    public List<LeaveDTO> getLeaveRecordsForLoggedInUser() {
        // Find the logged-in employee using the authenticated email
        String loggedInUsername = getLoggedInUsername();
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Fetch only OT records related to the logged-in user
        List<Leave> leaveRecords = leaveRepository.findByEmployeeId(employee.getId());

        // Convert to DTO format
        return leaveRecords.stream()
                .map(leave -> new LeaveDTO(leave, leave.getEmployee(), leave.getManager()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }
    public List<LeaveDTO> getLeaveByEmployeeId(String employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new RuntimeException("Employee not found");
        }

        // Get all leave records for this employee
        List<Leave> leaveList = leaveRepository.findByEmployeeId(employeeId);

        // Convert each leave record into a LeaveDTO
        return leaveList.stream()
                .map(leave -> new LeaveDTO(leave, leave.getEmployee(), leave.getManager()))
                .collect(Collectors.toList());
    }


    public LeaveDTO submitLeaveRequest(LeaveDTO requestDTO) {

        //  Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch employee from the database using the email (logged-in username)

        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        System.out.println("Employee Role: " + employee.getRole());


        // Assign the employee's manager (if they have one). Manager will be null for managers.
        Employee manager = null;
        if (!"Manager".equals(employee.getRole().getRoleName())) {
            manager = employee.getManager();  // Get the manager if the employee is not a manager
        }
        // Calculate total leave days based on start date, end date, and leave duration (Full-day or Half-day)
        double totalLeaveDays = calculateTotalLeaveDays(requestDTO.getStartDate(), requestDTO.getEndDate(), requestDTO.getLeaveDuration());

        // Set the calculated total leave days in the requestDTO
        requestDTO.setTotalDays(totalLeaveDays);
        String leaveId = generateLeaveId();  // This will generate the new OT ID

        //  Create and save Leave request
        Leave leave = new Leave();
        leave.setId(leaveId); // Set the generated leave ID
        leave.setEmployee(employee);// Automatically set logged-in employee
        leave.setManager(manager);
        leave.setStartDate(requestDTO.getStartDate());
        leave.setEndDate(requestDTO.getEndDate());
        leave.setTotalDays(totalLeaveDays);
        leave.setReason(requestDTO.getReason());
        leave.setStatus(requestDTO.getStatus());
        leave.setLeaveType(requestDTO.getLeaveType());
        leave.setLeaveDuration(requestDTO.getLeaveDuration());
// Automatically set the leave status to Approved if the employee is a manager
        if ("Manager".equals(employee.getRole().getRoleName())) {
            leave.setStatus(RequestStatus.APPROVED);  // Approve the leave if the employee is a manager
        } else {
            leave.setStatus(RequestStatus.PENDING);  // Otherwise, the leave is pending
        }
        // Save OT object to the repository
        Leave savedLeave = leaveRepository.save(leave);

        // Return an OtDTO response including employeeName and managerName
        return new LeaveDTO(savedLeave, employee, manager);
    }

    public double calculateTotalLeaveDays(LocalDate startDate, LocalDate endDate, LeaveDuration leaveDuration) {
        // Handle edge case where start date is after end date
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }

        // If the leave is half-day, immediately return 0.5
        if (leaveDuration == LeaveDuration.MORNING_HALF || leaveDuration == LeaveDuration.EVENING_HALF) {
            return 0.5; // Half leave is always 0.5 days
        }

        double totalDays = 0.0;
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            // Debugging: Print each date
            System.out.println("Checking: " + currentDate);

            // Use DateService to check if the current date is a working day
            if (dateService.isWorkingDay(currentDate)) {
                totalDays++;
            }
            currentDate = currentDate.plusDays(1);
        }

        // Return the total days (this will exclude weekends and public holidays)
        return totalDays;
    }


    public LeaveDTO processLeaveRequest(String leaveId,String action, String rejectionReason) {
        // Get logged-in manager
        String loggedInUsername = getLoggedInUsername();
        Employee manager = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager not found"));

        // Find leave request by ID
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Leave request not found"));

        if (!leave.getStatus().equals(RequestStatus.PENDING)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This leave request has already been processed.");
        }

        // Check if the logged-in user is the assigned manager
        if (!leave.getManager().getEmail().equals(loggedInUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to reject this leave request.");
        }

        // Process based on action type
        if ("approve".equalsIgnoreCase(action)) {
            leave.setStatus(RequestStatus.APPROVED);
            leave.setRejectionReason(null);

            //Reduce leave balance using EmployeeLeaveService
            EmployeeLeave employeeLeave = employeeLeaveRepository.findByEmployeeId(leave.getEmployee().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee's leave balance not found"));

            employeeLeaveService.updateLeaveBalance(employeeLeave, leave.getLeaveType(), leave.getTotalDays());
            // Mark attendance as leave for the approved dates
            attendanceService.updateAttendanceForLeave(leave.getEmployee(), leave.getStartDate(), leave.getEndDate(),leave);

        } else if ("reject".equalsIgnoreCase(action)) {
            if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejection reason is required.");
            }
            leave.setStatus(RequestStatus.REJECTED);
            leave.setRejectionReason(rejectionReason);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action. Use 'approve' or 'reject'.");
        }
        Leave updatedLeave = leaveRepository.save(leave);

        // Return updated OT DTO with rejection reason
        return new LeaveDTO(updatedLeave, leave.getEmployee(), manager);
    }

    public Map<String, Long> getLeaveStatusCountForLoggedInUser() {
        // Find employee by email from SecurityContext
        Employee employee = employeeRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        // Fetch leave status count for the employee
        List<Object[]> results = leaveRepository.getStatusCountByEmployeeId(employee.getId());

        // Convert results to a map
        Map<String, Long> statusCountMap = results.stream()
                .collect(Collectors.toMap(
                        row -> ((RequestStatus) row[0]).name(),  // Convert Enum to String
                        row -> ((Number) row[1]).longValue()     // Convert count properly
                ));

        // Dynamically get all possible statuses from the RequestStatus enum
        for (RequestStatus status : RequestStatus.values()) {
            statusCountMap.putIfAbsent(status.name(), 0L);
        }

        return statusCountMap;
    }

    public Map<String, Long> getLeaveStatusCountByRole() {
        // Get logged-in user from the security context
        Employee employee = employeeRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        List<Object[]> results;

        if (employee.getRoleName().equals("Admin")) {
            // Admin: Fetch status count for all employees
            results = leaveRepository.getStatusCountForAllEmployees();
        } else if (employee.getRoleName().equals("Manager")) {
            // Manager: Fetch status count for employees they manage
            results = leaveRepository.getStatusCountByManagerId(employee.getId());
        } else {
            // If the role is not Admin or Manager, you could either throw an exception or return an empty map
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to access this resource");
        }

        // Convert results to a map
        Map<String, Long> statusCountMap = results.stream()
                .collect(Collectors.toMap(
                        row -> ((RequestStatus) row[0]).name(),  // Convert Enum to String
                        row -> ((Number) row[1]).longValue()     // Convert count properly
                ));

        // Ensure all statuses are included with a count of 0 if missing
        for (RequestStatus status : RequestStatus.values()) {
            statusCountMap.putIfAbsent(status.name(), 0L);
        }

        return statusCountMap;
    }



    // Helper method to get logged-in username (email) from JWT
    private String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }


    public String generateLeaveId() {
        // Get the last Attendance ID from the database
        Optional<String> lastIdOptional = leaveRepository.findLastLeaveId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "LEA";

        // Generate the new Attendance ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }
}

