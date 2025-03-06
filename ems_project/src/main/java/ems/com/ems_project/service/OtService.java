package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.Ots;
import ems.com.ems_project.model.RequestStatus;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.OtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    private JWTUtils jwtutils;


    public List<OtDTO> getOtRecordRoleBased(String token) {
        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the logged-in employee details (who is the manager)
        Employee manager = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Ots> otList = new ArrayList<>();

        if ("Admin".equals(roleName)) {
            // Admin: Get all leave records
            otList = otRepository.findAll();
        } else if ("Manager".equals(roleName)) {
            // Manager: Get leave requests where they are assigned as the manager
            otList = otRepository.findByManagerId(manager.getId());
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


    public OtDTO submitOTRequest(OtDTO requestDTO) {

        //  Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch employee from the database using the email (logged-in username)

        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));


        // Assign the employee's manager (if they have one). Manager will be null for managers.
        Employee manager = null;
        if (!"Manager".equals(employee.getRole().getRoleName())) {
            manager = employee.getManager();  // Get the manager if the employee is not a manager
        }

        // Generate OT ID
        String otId = generateOtId();

        //  Create and save OT request
        Ots ot = new Ots();
        ot.setId(otId); // Set the generated OT ID
        ot.setEmployee(employee);// Automatically set logged-in employee
        ot.setManager(manager);
        ot.setDate(requestDTO.getDate());
        ot.setStartTime(requestDTO.getStartTime());
        ot.setEndTime(requestDTO.getEndTime());
        ot.setOtTime(requestDTO.getOtTime());
        ot.setReason(requestDTO.getReason());
        ot.setStatus(requestDTO.getOtStatus());

        if ("Manager".equals(employee.getRole().getRoleName())) {
            ot.setStatus(RequestStatus.APPROVED);  // Approve the leave if the employee is a manager
        } else {
            ot.setStatus(RequestStatus.PENDING);  // Otherwise, the leave is pending
        }
        // Save OT object to the repository
        Ots savedOt = otRepository.save(ot);

        // Return an OtDTO response including employeeName and managerName
        return new OtDTO(savedOt, employee, manager);
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
            } else {
                if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejection reason is required.");
                }
                ot.setStatus(RequestStatus.REJECTED);
                ot.setRejectionReason(rejectionReason);  // Set rejection reason
            }
        }
        // Check if Admin is marking OT as paid
        else if ("paid".equalsIgnoreCase(action)) {
            // Ensure only Admin can mark as paid
            if (!"Admin".equalsIgnoreCase(employee.getRoleName())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only Admin can mark OT as paid.");
            }

            // Ensure OT is already approved before marking as paid
            if (!RequestStatus.APPROVED.equals(ot.getStatus())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only approved OT requests can be marked as paid.");
            }

            ot.setPaid(true); // Mark OT as paid
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid action. Use 'approve', 'reject', or 'paid'.");
        }
        // Save the updated OT request to the database
        Ots updatedOt = otRepository.save(ot);

        // Return updated OT DTO with rejection reason
        return new OtDTO(updatedOt, ot.getEmployee(), ot.getManager());
    }
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
