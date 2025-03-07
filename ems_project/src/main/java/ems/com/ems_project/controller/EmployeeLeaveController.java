package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.service.EmployeeLeaveService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/empleave")
public class EmployeeLeaveController {

    @Autowired
    private EmployeeLeaveService employeeLeaveService;

    @GetMapping
    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveService.getAllLeavesWithEmployeeName();
    }

    @GetMapping("/self")
    public ResponseEntity<EmployeeLeaveDTO> getEmployeeLeaveBalance(HttpServletRequest request) {
        // Get logged-in user's email from the JWT token
        String loggedInUsername = request.getUserPrincipal().getName();

        // Get employee leave balance based on the email
        EmployeeLeaveDTO employeeLeaveDTO = employeeLeaveService.getEmployeeLeaveByEmployeeId(loggedInUsername);

        // Return the employee leave balance
        return ResponseEntity.ok(employeeLeaveDTO);
    }

    @GetMapping("/role/records")
    public ResponseEntity<List<EmployeeLeaveDTO>> getEmployeeLeaveRecordRoleBased(@RequestHeader("Authorization") String token) {
        try {
            String actualToken = token.replace("Bearer ", "");
            // Extract leave records based on role and token
            List<EmployeeLeaveDTO> employeeLeaveRecords = employeeLeaveService.getEmployeeLeaveRecordRoleBased(actualToken);

            // Return response with the leave records
            return ResponseEntity.ok(employeeLeaveRecords);
        } catch (RuntimeException e) {
            // Handle error (e.g., invalid token or other issues)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        } catch (Exception e) {
            // Handle other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

}
