package ems.com.ems_project.service;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.repository.OtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OtService {

    @Autowired
    private OtRepository otRepository;
    private GenerateId generateId;

    // Method to get all OT records with employee and manager names
    public List<OtDTO> getAllOt() {
        return otRepository.findAll().stream()
                .map(ot -> new OtDTO(ot, ot.getEmployee(), ot.getManager()))  // Pass Employee and Manager to DTO constructor
                .collect(Collectors.toList()); // Collect the list of DTOs
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
