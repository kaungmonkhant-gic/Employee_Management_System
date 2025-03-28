package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.dto.ReqRes;
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

    @GetMapping("/role/records")
    public ResponseEntity<List<OtDTO>> getOtBasedOnRole(
            @RequestHeader("Authorization") String token) {
        // Extract actual token (remove "Bearer ")
        String actualToken = token.replace("Bearer ", "");

        List<OtDTO> otList = otService.getOtRecordRoleBased(actualToken);
        return ResponseEntity.ok(otList);
    }

    @GetMapping("/self")
    public ResponseEntity<List<OtDTO>> getLoggedInUserOtRecords() {
        return ResponseEntity.ok(otService.getOtRecordsForLoggedInUser());
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
    public ResponseEntity<ReqRes> submitLeaveRequest(@RequestBody OtDTO otRequest) {
        // Call the service to submit the leave request
        ReqRes response = otService.submitOTRequest(otRequest);

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

    // Get leave status count based on role (Admin/Manager)
    @GetMapping("/role-status-count")
    public Map<String, Long> getLeaveStatusForRoleBased() {
        return otService.getOTStatusCountByRole();
    }

}