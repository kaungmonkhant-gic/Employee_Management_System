package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @GetMapping("/self")
    public ResponseEntity<List<LeaveDTO>> getLoggedInUserLeaveRecords() {
        return ResponseEntity.ok(leaveService.getLeaveRecordsForLoggedInUser());
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<LeaveDTO>> getLeaveByEmployeeId(@PathVariable String employeeId) {
        List<LeaveDTO> leaveDTO = leaveService.getLeaveByEmployeeId(employeeId);
        return ResponseEntity.ok(leaveDTO);
    }

    @PostMapping("/submit")
    public ResponseEntity<ReqRes> submitLeaveRequest(@RequestBody LeaveDTO leaveRequest) {
        // Call the service to submit the leave request
        ReqRes response = leaveService.submitLeaveRequest(leaveRequest);

        // Check the status code in the response
        if (response.getStatusCode() == 200) {
            // Return successful response with status code 200
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response.getStatusCode() == 400) {
            // Return bad request response in case of validation errors
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else {
            // Return internal server error response in case of unexpected errors
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//    // Endpoint to calculate total leave days based on start date, end date, and leave type
//    @PostMapping("/totaldays")
//    public ResponseEntity<Double> getTotalLeaveDays(@RequestBody LeaveDTO leaveDTO) {
//        // Extract startDate, endDate, and leaveDuration from the request body
//        LocalDate startDate = leaveDTO.getStartDate();
//        LocalDate endDate = leaveDTO.getEndDate();
//        LeaveDuration leaveDuration = leaveDTO.getLeaveDuration();
//
//        // Validate dates
//        if (startDate == null || endDate == null || leaveDuration == null) {
//            return ResponseEntity.badRequest().body(0.0);
//        }
//
//        // Calculate total leave days
//        double totalDays = leaveService.calculateTotalLeaveDays(startDate, endDate, leaveDuration);
//
//        return ResponseEntity.ok(totalDays);
//    }

    // Get leave status count based on role (Admin/Manager)
    @GetMapping("/role-status-count")
    public Map<String, Long> getLeaveStatusForRoleBased() {
        return leaveService.getLeaveStatusCountByRole();
    }

    @GetMapping("/status-count")
    public ResponseEntity<Map<String, Long>> getLeaveStatusCount() {
        Map<String, Long> statusCount = leaveService.getLeaveStatusCountForLoggedInUser();
        return ResponseEntity.ok(statusCount);
    }
    @GetMapping("/role/records")
    public ResponseEntity<List<LeaveDTO>> getLeaveBasedOnRole(
            @RequestHeader("Authorization") String token) {
        // Extract actual token (remove "Bearer ")
        String actualToken = token.replace("Bearer ", "");

        List<LeaveDTO> leaveDTOs = leaveService.getLeavesRecordRoleBased(actualToken);
        return ResponseEntity.ok(leaveDTOs);
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