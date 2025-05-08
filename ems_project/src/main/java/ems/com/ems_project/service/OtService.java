package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.LeaveRepository;
import ems.com.ems_project.repository.OtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OtService {

    @Autowired
    private OtRepository otRepository;

    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JWTUtils jwtutils;
    @Autowired
    private AttendanceService attendanceService;
    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private DailyAttendanceRepository attendanceRepository;


    public List<OtDTO> getOtRecordRoleBased(String token) {
        // Get active employees based on role
        List<EmployeeDTO> activeEmployees = employeeService.getActiveEmployeesBasedOnRole(token);

        // Extract active employee IDs
        List<String> activeEmployeeIds = activeEmployees.stream()
                .map(EmployeeDTO::getId)
                .collect(Collectors.toList());

        List<Ots> otList = new ArrayList<>();

        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the logged-in employee details
        Employee manager = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if ("Admin".equals(roleName)) {
            // Admin: Get all OT records for active employees
            otList = otRepository.findAll().stream()
                    .filter(ot -> activeEmployeeIds.contains(ot.getEmployee().getId()))
                    .collect(Collectors.toList());

        } else if ("Manager".equals(roleName)) {
            // Manager: Get OT records where they are assigned as the manager, only for active employees
            otList = otRepository.findByManagerId(manager.getId()).stream()
                    .filter(ot -> activeEmployeeIds.contains(ot.getEmployee().getId()))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList(); // Other roles don't have access
        }

        // Convert to DTO and return
        return otList.stream()
                .map(ot -> new OtDTO(ot, ot.getEmployee(), ot.getManager()))
                .collect(Collectors.toList());
    }


    public List<OtDTO> getOtRecordsForLoggedInUser() {
        // Find the logged-in employee using the authenticated email
        String loggedInUsername = getLoggedInUsername();
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Fetch only OT records related to the logged-in user
        List<Ots> otRecords = otRepository.findByEmployeeId(employee.getId());

        // Convert to DTO format
        return otRecords.stream()
                .map(ot -> new OtDTO(ot, ot.getEmployee(), ot.getManager()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }

    public ReqRes submitOTRequest(OtDTO requestDTO) {
        ReqRes response = new ReqRes();

        try {
            // Get the logged-in username (email) from JWT token
            String loggedInUsername = getLoggedInUsername();

            // Fetch employee from the database using the email (logged-in username)
            Employee employee = employeeRepository.findByEmail(loggedInUsername)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

            // Assign the employee's manager (if they have one). Manager will be null for managers.
            Employee manager = null;
            if (!"Manager".equals(employee.getRole().getRoleName())) {
                manager = employee.getManager();  // Get the manager if the employee is not a manager
            }

            // Get the date and times from the OT request DTO
            LocalDate requestDate = requestDTO.getDate();
            LocalTime newStartDateTime = requestDTO.getStartTime();
            LocalTime newEndDateTime = requestDTO.getEndTime();

            // Check for overlapping OT requests for the same employee on the same date
            boolean isOverlap = otRepository.existsOTOverlap(employee, requestDate, newStartDateTime, newEndDateTime);

            if (isOverlap) {
                // If overlap exists, return a bad request status with the error message
                response.setStatusCode(400);  // Bad request status
                response.setError("You already have an OT request that overlaps with these times.");
                return response;
            }

            // Generate OT ID
            String otId = generateOtId();

            // Create and save OT request
            Ots ot = new Ots();
            ot.setId(otId); // Set the generated OT ID
            ot.setEmployee(employee); // Automatically set logged-in employee
            ot.setManager(manager);
            ot.setDate(requestDate); // Set the OT request date
            ot.setStartTime(newStartDateTime);
            ot.setEndTime(newEndDateTime);
            ot.setOtTime(requestDTO.getOtTime());
            ot.setReason(requestDTO.getReason());

            // Set OT request status based on the employee's role
            if ("Manager".equals(employee.getRole().getRoleName())) {
                ot.setStatus(RequestStatus.APPROVED);  // Approve the OT if the employee is a manager
            } else {
                ot.setStatus(RequestStatus.PENDING);  // Otherwise, the OT is pending
            }

            // Save OT object to the repository
            Ots savedOt = otRepository.save(ot);

            // If manager, auto-approved OT should also update attendance
            if (savedOt.getStatus() == RequestStatus.APPROVED) {
                attendanceService.updateOTForAttendance(employee, requestDate, savedOt);
            }

            // Return successful response with OTDTO
            response.setStatusCode(200);  // OK status
            response.setMessage("OT request submitted successfully.");
            response.setOtRequest(new OtDTO(savedOt, employee, manager));  // Set OTDTO for the successful response

            return response;

        } catch (Exception e) {
            // Handle any errors and return failure response
            response.setStatusCode(500);  // Internal server error
            response.setError("Error during OT request submission: " + e.getMessage());
            return response;
        }
    }


    public List<OtDTO> getOTByEmployeeId(String employeeId) {

        if (!employeeRepository.existsById(employeeId)) {
            throw new RuntimeException("Employee not found");
        }

        // Get all leave records for this employee
        List<Ots> otList = otRepository.findByEmployeeId(employeeId);

        // Convert each leave record into a LeaveDTO
        return otList.stream()
                .map(ots-> new OtDTO(ots, ots.getEmployee(), ots.getManager()))
                .collect(Collectors.toList());
    }


    public OtDTO processOTRequest(String otId, String action, String rejectionReason) {
        // Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch the logged-in employee (manager)
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));

        // Fetch the OT request by ID
        Ots ot = otRepository.findById(otId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "OT request not found"));

        // Check if Manager is approving/rejecting OT
        if ("approve".equalsIgnoreCase(action) || "reject".equalsIgnoreCase(action)) {
            // Ensure only the assigned manager can approve/reject
            if (!ot.getManager().getEmail().equals(loggedInUsername)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the assigned manager can process this OT request.");
            }

            if ("approve".equalsIgnoreCase(action)) {
                ot.setStatus(RequestStatus.APPROVED);
                ot.setRejectionReason(null);  // Clear rejection reason if approving


                // Update attendance with OT details
                attendanceService.updateOTForAttendance(ot.getEmployee(), ot.getDate(), ot);

            } else if ("reject".equalsIgnoreCase(action)) {
                // If rejecting, a rejection reason must be provided
                if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejection reason is required.");
                }
                ot.setStatus(RequestStatus.REJECTED);
                ot.setRejectionReason(rejectionReason);
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action. Use 'approve', 'reject'.");
        }

        // Save the updated OT request to the database
        Ots updatedOt = otRepository.save(ot);
        return new OtDTO(updatedOt, ot.getEmployee(), ot.getManager());
    }

//    public OtDTO processOTRequest(String otId, String action, String rejectionReason) {
//        // Get the logged-in username (email) from JWT token
//        String loggedInUsername = getLoggedInUsername();
//
//        // Fetch the logged-in employee (manager)
//        Employee employee = employeeRepository.findByEmail(loggedInUsername)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));
//
//        // Fetch the OT request by ID
//        Ots ot = otRepository.findById(otId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "OT request not found"));
//
//        // Check if Manager is approving/rejecting OT
//        if ("approve".equalsIgnoreCase(action) || "reject".equalsIgnoreCase(action)) {
//            // Ensure only the assigned manager can approve/reject
//            if (!ot.getManager().getEmail().equals(loggedInUsername)) {
//                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the assigned manager can process this OT request.");
//            }
//
//            if ("approve".equalsIgnoreCase(action)) {
//                ot.setStatus(RequestStatus.APPROVED);
//                ot.setRejectionReason(null);
////                Update attendance with OT details
////                attendanceService.updateOTForAttendance(ot.getEmployee(), ot.getDate(), ot);
//            } else if ("reject".equalsIgnoreCase(action)) {
//                // If rejecting, a rejection reason must be provided
//                if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
//                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejection reason is required.");
//                }
//                ot.setStatus(RequestStatus.REJECTED);
//                ot.setRejectionReason(rejectionReason);  // Set rejection reason
//            }
//        }
//        else {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action. Use 'approve', 'reject', or 'paid'.");
//        }
//        // Save the updated OT request to the database
//        Ots updatedOt = otRepository.save(ot);
//
//        // Return updated OT DTO with rejection reason
//        return new OtDTO(updatedOt, ot.getEmployee(), ot.getManager());
//    }
    public Map<String, Long> getOtStatusCountForLoggedInUser() {
        // Find employee by email from SecurityContext
        Employee employee = employeeRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        // Fetch OT status count for the employee
        List<Object[]> results = otRepository.getStatusCountByEmployeeId(employee.getId());

        // Convert results to a map
        Map<String, Long> statusCountMap = results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],   // Status
                        row -> ((Number) row[1]).longValue()  // Count
                ));

        // Dynamically get all possible statuses from the RequestStatus enum
        for (RequestStatus status : RequestStatus.values()) {
            statusCountMap.putIfAbsent(status.name(), 0L);
        }

        return statusCountMap;
    }

    public Map<String, Long> getOTStatusCountByRole() {
        // Get logged-in user from the security context
        Employee employee = employeeRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        List<Object[]> results;

        if (employee.getRoleName().equals("Admin")) {
            // Admin: Fetch status count for all employees
            results = otRepository.getStatusCountForAllEmployees();
        } else if (employee.getRoleName().equals("Manager")) {
            // Manager: Fetch status count for employees they manage
            results = otRepository.getStatusCountByManagerId(employee.getId());
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

    public String generateOtId() {
        // Get the last Attendance ID from the database
        Optional<String> lastIdOptional = otRepository.findLastOtId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "Ot";

        // Generate the new Attendance ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }
}
