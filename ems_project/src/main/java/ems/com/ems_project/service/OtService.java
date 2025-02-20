package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Ots;
import ems.com.ems_project.model.RequestStatus;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.OtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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

    public Ots submitOTRequest(OtDTO requestDTO) {
        // 1️⃣ Get the logged-in username (email) from JWT token
        String loggedInUsername = getLoggedInUsername();

        // 2️⃣ Fetch employee from the database using the email (logged-in username)

        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // 3️⃣ Generate OT ID
        String otId = generateOtId();  // This will generate the new OT ID

        // 4️⃣ Create and save OT request
        Ots ot = new Ots();
        ot.setId(generateOtId()); // Set the generated OT ID
        ot.setEmployee(employee); // Automatically set logged-in employee
        ot.setDate(requestDTO.getDate());
        ot.setStartTime(requestDTO.getStartTime());
        ot.setEndTime(requestDTO.getEndTime());
        ot.setOtTime(requestDTO.getOtTime());
        ot.setReason(requestDTO.getReason());
        ot.setStatus(RequestStatus.PENDING);

        // 5️⃣ Save OT object to the repository
        return otRepository.save(ot);
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
