package ems.com.ems_project.controller;

import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.model.Ots;
import ems.com.ems_project.service.OtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ot")
public class OtController {

    @Autowired
    private OtService otService;

    // Get all OT records with employee and manager names
    @GetMapping("/all")
    public List<OtDTO> getAllOt() {
        return otService.getAllOt();
    }

    // Generate a new OT ID
    @GetMapping("/generate-id")
    public String generateOtId() {
        return otService.generateOtId();
    }
    @PostMapping("/submit")
    public ResponseEntity<Ots> submitOtRequest(@RequestBody OtDTO otDTO) {
        try {
            // Call the service to submit the OT request
            Ots createdOt = otService.submitOTRequest(otDTO);

            // Return success response with created OT
            return new ResponseEntity<>(createdOt, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Return error response if employee not found or any other error
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
