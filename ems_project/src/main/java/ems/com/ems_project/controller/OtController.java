package ems.com.ems_project.controller;

import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.service.OtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<OtDTO>> getOTByEmployeeId(@PathVariable String employeeId) {
        List<OtDTO> otDTO = otService.getOTByEmployeeId(employeeId);
        return ResponseEntity.ok(otDTO);
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

    @PutMapping("/{action}/{otId}")
    public ResponseEntity<OtDTO> processOTRequest(
            @PathVariable String action,
            @PathVariable String otId,
            @RequestBody(required = false) Map<String, String> requestBody) {

        String rejectionReason = (requestBody != null) ? requestBody.get("reason") : null;
        OtDTO updatedOtDTO = otService.processOTRequest(otId, action, rejectionReason);
        return ResponseEntity.ok(updatedOtDTO);
    }
    @GetMapping("/status-count")
    public ResponseEntity<Map<String, Long>> getOtStatusCount() {
        Map<String, Long> statusCount = otService.getOtStatusCountForLoggedInUser();
        return ResponseEntity.ok(statusCount);
    }

}