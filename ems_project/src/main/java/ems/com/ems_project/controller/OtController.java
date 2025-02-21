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
    public ResponseEntity<OtDTO> submitOtRequest(@RequestBody OtDTO otDTO) {
        try {
            // Call the service to submit the OT request and get the saved OT
            OtDTO createdOtDTO = otService.submitOTRequest(otDTO);  // Assuming service now returns OtDTO

            // Return success response with created OT DTO
            return new ResponseEntity<>(createdOtDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Return error response if employee not found or any other error
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
