package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/self")
    public ResponseEntity<List<LeaveDTO>> getLoggedInUserLeaveRecords() {
        return ResponseEntity.ok(leaveService.getLeaveRecordsForLoggedInUser());
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
    // Get leave status count based on role (Admin/Manager)
    @GetMapping("/role")
    public Map<String, Long> getLeaveStatusForRoleBased() {
        return leaveService.getLeaveStatusCountByRole();
    }

    @GetMapping("/status-count")
    public ResponseEntity<Map<String, Long>> getLeaveStatusCount() {
        Map<String, Long> statusCount = leaveService.getLeaveStatusCountForLoggedInUser();
        return ResponseEntity.ok(statusCount);
    }


    @PutMapping("/{action}/{leaveId}")
    public ResponseEntity<LeaveDTO> processLeaveRequest(
            @PathVariable String action,
            @PathVariable String leaveId,
            @RequestBody(required = false) Map<String, String> requestBody) {

        String rejectionReason = (requestBody != null) ? requestBody.get("reason") : null;
       LeaveDTO updatedLeaveDTO = leaveService.processLeaveRequest(leaveId, action, rejectionReason);
        return ResponseEntity.ok(updatedLeaveDTO);
    }
}