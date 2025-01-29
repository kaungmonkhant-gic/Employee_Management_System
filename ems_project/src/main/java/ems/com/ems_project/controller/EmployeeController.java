package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all employees
    @GetMapping("/admin/all")
    public ResponseEntity<List<EmployeeProfile>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/admin/employee/{id}")
    public ResponseEntity<ReqRes> getEmployeeById(@PathVariable String id) {
        ReqRes reqRes = new ReqRes();
        try {
            // Fetch the employee profile from the service
            EmployeeProfile employeeProfile = employeeService.getEmployeeById(id);

            // Set success status code and message
            reqRes.setStatusCode(200);
            reqRes.setMessage("Profile retrieval successful.");
            reqRes.setEmployeeProfile(employeeProfile);

            // Return the response with status 200 (OK)
            return ResponseEntity.ok(reqRes);
        } catch (Exception e) {
            // Handle error (e.g., employee not found)
            reqRes.setStatusCode(404);
            reqRes.setMessage("Employee not found with ID: " + id);

            // Return the response with status 404 (Not Found)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(reqRes);
        }
    }



    // Endpoint to register a new employee
    @PostMapping("/register")
    public ResponseEntity<ReqRes> registerEmployee(@RequestBody RegisterDTO registerDTO) {
        ReqRes reqRes = employeeService.registerEmployee(registerDTO);

        // Return appropriate response based on status code
        if (reqRes.getStatusCode() == 201) {
            return new ResponseEntity<>(reqRes, HttpStatus.CREATED);
        } else if (reqRes.getStatusCode() == 409) {
            return new ResponseEntity<>(reqRes, HttpStatus.CONFLICT);
        } else if (reqRes.getStatusCode() == 400) {
            return new ResponseEntity<>(reqRes, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            // Get the username (email) of the currently authenticated user
            String loggedInUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            // Fetch the employee details based on the logged-in user's email
            ReqRes reqRes = employeeService.getProfile(loggedInUserEmail);

            if (reqRes.getStatusCode() == 200) {
                return ResponseEntity.ok(reqRes);
            } else {
                return ResponseEntity.status(reqRes.getStatusCode()).body(reqRes.getMessage());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching the profile: " + e.getMessage());
        }
    }
 // Update an existing employee
    @PutMapping("/admin/update/{employeeId}")
    public ResponseEntity<ReqRes> updateEmployee(@PathVariable String employeeId, @Valid @RequestBody Employee employee) {
        ReqRes reqRes = employeeService.updateEmployee(employeeId, employee);

        if (reqRes.getStatusCode() == 200) {
            return new ResponseEntity<>(reqRes, HttpStatus.OK);
        } else if (reqRes.getStatusCode() == 404) {
            return new ResponseEntity<>(reqRes, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete an employee by ID
    @DeleteMapping("/admin/delete/{employeeId}")
    public ResponseEntity<ReqRes> deleteEmployee(@PathVariable String employeeId) {
        ReqRes reqRes = employeeService.deleteEmployee(employeeId);

        if (reqRes.getStatusCode() == 200) {
            return new ResponseEntity<>(reqRes, HttpStatus.OK);
        } else if (reqRes.getStatusCode() == 404) {
            return new ResponseEntity<>(reqRes, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


   
