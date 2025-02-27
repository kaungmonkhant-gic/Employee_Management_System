package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.RequestStatus;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;

    // Method to get all Leave records with employee and manager
    public List<LeaveDTO> getAllLeave() {
        return leaveRepository.findAll().stream()
                .map(leave -> new LeaveDTO(leave, leave.getEmployee(), leave.getManager()))  // Pass Employee and Manager to DTO constructor
                .collect(Collectors.toList()); // Collect the list of DTOs
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

        // Assign the employee's manager (if they have one)
        Employee manager = employee.getManager();

        String leaveId = generateLeaveId();  // This will generate the new OT ID

        //  Create and save Leave request
        Leave leave = new Leave();
        leave.setId(leaveId); // Set the generated leave ID
        leave.setEmployee(employee);// Automatically set logged-in employee
        leave.setManager(manager);
        leave.setStartDate(requestDTO.getStartDate());
        leave.setEndDate(requestDTO.getEndDate());
        leave.setTotalDays(requestDTO.getTotalDays());
        leave.setReason(requestDTO.getReason());
        leave.setStatus(requestDTO.getStatus());
        leave.setLeaveType(requestDTO.getLeaveType());
        // Save OT object to the repository
        Leave savedLeave = leaveRepository.save(leave);

        // Return an OtDTO response including employeeName and managerName
        return new LeaveDTO(savedLeave, employee, manager);
    }

    public LeaveDTO approveLeaveRequest(String leaveId) {
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


        // Update status to APPROVED
        leave.setStatus(RequestStatus.APPROVED);
        Leave updatedLeave = leaveRepository.save(leave);

        return new LeaveDTO(updatedLeave, leave.getEmployee(), manager);
    }
    public LeaveDTO rejectLeaveRequest(String leaveId) {
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

        // Update status to REJECTED
        leave.setStatus(RequestStatus.REJECTED);
        Leave updatedLeave = leaveRepository.save(leave);

        return new LeaveDTO(updatedLeave, leave.getEmployee(), manager);
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

