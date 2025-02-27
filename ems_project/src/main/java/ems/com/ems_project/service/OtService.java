package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.model.Employee;
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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OtService {

    @Autowired
    private OtRepository otRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;

    // Method to get all OT records with employee and manager names
    public List<OtDTO> getAllOt() {
        return otRepository.findAll().stream()
                .map(ot -> new OtDTO(ot, ot.getEmployee(), ot.getManager()))  // Pass Employee and Manager to DTO constructor
                .collect(Collectors.toList()); // Collect the list of DTOs
    }

    public OtDTO submitOTRequest(OtDTO requestDTO) {

        //  Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch employee from the database using the email (logged-in username)

        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Assign the employee's manager (if they have one)
        Employee manager = employee.getManager();

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
    public OtDTO approveOTRequest(String otId) {
        // Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch the logged-in employee (manager)
        Employee manager = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager not found"));

        // Fetch the OT request by ID
        Ots ot = otRepository.findById(otId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"OT request not found"));

        // Check if OT request is already approved or rejected
        if (!ot.getStatus().equals(RequestStatus.PENDING)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This OT request has already been processed.");
        }

        // Check if the logged-in user is the assigned manager
        if (!ot.getManager().getEmail().equals(loggedInUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"You are not authorized to approve this OT request");
        }

        // Update the status to "Approved"
        ot.setStatus(RequestStatus.APPROVED);

        // Save the updated OT request
        Ots updatedOt = otRepository.save(ot);

        // Return updated OT DTO
        return new OtDTO(updatedOt, ot.getEmployee(), manager);
    }

    // Method to reject OT request
    public OtDTO rejectOTRequest(String otId) {
        // Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // Fetch the logged-in employee (manager)
        Employee manager = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager not found"));

        // Fetch the OT request by ID
        Ots ot = otRepository.findById(otId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"OT request not found"));

        // Check if OT request is already approved or rejected
        if (!ot.getStatus().equals(RequestStatus.PENDING)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This OT request has already been processed.");
        }
        // Check if the logged-in user is the assigned manager
        if (!ot.getManager().getEmail().equals(loggedInUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"You are not authorized to approve this OT request");
        }
        // Update the status to "Rejected"
        ot.setStatus(RequestStatus.REJECTED);

        // Save the updated OT request
        Ots updatedOt = otRepository.save(ot);

        // Return updated OT DTO
        return new OtDTO(updatedOt, ot.getEmployee(), manager);
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
