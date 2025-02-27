package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.LeaveDTO;
import ems.com.ems_project.service.EmployeeLeaveService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
//    @GetMapping("/{employeeId}")
//    public ResponseEntity<EmployeeLeaveDTO> getLeaveByEmployeeId(@PathVariable String employeeId) {
//        EmployeeLeaveDTO empleaveDTO = employeeLeaveService.getEmployeeLeaveByEmployeeId(employeeId);
//        return ResponseEntity.ok(empleaveDTO);
//    }
    @GetMapping("/self")
    public ResponseEntity<EmployeeLeaveDTO> getEmployeeLeaveBalance(HttpServletRequest request) {
        // Get logged-in user's email from the JWT token
        String loggedInUsername = request.getUserPrincipal().getName();

        // Get employee leave balance based on the email
        EmployeeLeaveDTO employeeLeaveDTO = employeeLeaveService.getEmployeeLeaveByEmployeeId(loggedInUsername);

        // Return the employee leave balance
        return ResponseEntity.ok(employeeLeaveDTO);
    }
}
