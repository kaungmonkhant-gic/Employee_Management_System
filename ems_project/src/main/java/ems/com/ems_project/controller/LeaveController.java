package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // Get all OT records with employee and manager names
    @GetMapping("/all")
    public List<LeaveDTO> getAllOt() {
        return leaveService.getAllLeave();
    }

    // Generate a new OT ID
    @GetMapping("/generate-id")
    public String generateLeaveId() {
        return leaveService.generateLeaveId();
    }

    @PostMapping("/submit")
    public ResponseEntity<LeaveDTO> submitL(@RequestBody LeaveDTO leaveDTO) {
        try {
            // Call the service to submit the OT request and get the saved OT
            LeaveDTO createdLeaveDTO = leaveService.submitLeaveRequest(leaveDTO);  // Assuming service now returns OtDTO

            // Return success response with created OT DTO
            return new ResponseEntity<>(createdLeaveDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Return error response if employee not found or any other error
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
