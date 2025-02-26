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
    public List<LeaveDTO> getAllLeave() {
        return leaveService.getAllLeave();
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<LeaveDTO>> getLeaveByEmployeeId(@PathVariable String employeeId) {
        List<LeaveDTO> leaveDTO = leaveService.getLeaveByEmployeeId(employeeId);
        return ResponseEntity.ok(leaveDTO);
    }

    // Generate a new OT ID
    @GetMapping("/generate-id")
    public String generateLeaveId() {
        return leaveService.generateLeaveId();
    }

    @PostMapping("/submit")
    public ResponseEntity<LeaveDTO> submitLeaveRequest(@RequestBody LeaveDTO leaveDTO) {
        try {
            LeaveDTO createdLeaveDTO = leaveService.submitLeaveRequest(leaveDTO);

            return new ResponseEntity<>(createdLeaveDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<LeaveDTO> approveLeave(@PathVariable String leaveId) {
        LeaveDTO updatedLeave = leaveService.approveLeaveRequest(leaveId);
        return ResponseEntity.ok(updatedLeave);
    }

    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<LeaveDTO> rejectLeave(@PathVariable String leaveId) {
        LeaveDTO updatedLeave = leaveService.rejectLeaveRequest(leaveId);
        return ResponseEntity.ok(updatedLeave);
    }
}