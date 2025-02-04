package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.service.DropDownService;
import ems.com.ems_project.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    private DropDownService dropdownService;

    @GetMapping("/all")
    public ResponseEntity<ReqRes> getAllEmployees() {
        ReqRes reqRes = employeeService.getAllEmployees();

        // Return appropriate response based on status code
        if (reqRes.getStatusCode() == 200) {
            return ResponseEntity.ok(reqRes); // Success - HTTP 200
        } else {
            return ResponseEntity.status(reqRes.getStatusCode()).body(reqRes); // Error - HTTP 500 or others
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable String id) {
        EmployeeDTO employeeDTO = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDTO);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<Map<String, List<String>>> getDropdownData() {
        Map<String, List<String>> dropdownData = dropdownService.getDropdownData();
        return ResponseEntity.ok(dropdownData);
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody RegisterDTO registerDTO) {
        ReqRes reqRes = employeeService.registerEmployee(registerDTO);

        // Handle the response based on status code
        if (reqRes.getStatusCode() == 201) {
            return new ResponseEntity<>(reqRes, HttpStatus.CREATED);
        } else if (reqRes.getStatusCode() == 400) {
            return new ResponseEntity<>(reqRes, HttpStatus.BAD_REQUEST);
        } else if (reqRes.getStatusCode() == 409) {
            return new ResponseEntity<>(reqRes, HttpStatus.CONFLICT);
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
    @PutMapping("/profile")
    public ResponseEntity<ReqRes> updateProfile(@PathVariable String email, @RequestBody EmployeeProfile updatedProfile) {
        // Call the service method to update the profile
        ReqRes response = employeeService.updateProfile(email, updatedProfile);

        // Return appropriate response based on the result
        if (response.getStatusCode() == 200) {
            return ResponseEntity.ok(response);
        } else if (response.getStatusCode() == 404) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


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
    @DeleteMapping("/admin/delete/{Id}")
    public ResponseEntity<ReqRes> deleteEmployee(@PathVariable String Id) {
        ReqRes reqRes = employeeService.deleteEmployee(Id);

        if (reqRes.getStatusCode() == 200) {
            return new ResponseEntity<>(reqRes, HttpStatus.OK);
        } else if (reqRes.getStatusCode() == 404) {
            return new ResponseEntity<>(reqRes, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


   
