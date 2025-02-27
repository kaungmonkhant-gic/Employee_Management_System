package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//import javax.validation.Valid;


@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/all")
    public ResponseEntity<ReqRes> getAllEmployees() {
        ReqRes reqRes = new ReqRes();

        try {
            List<EmployeeDTO> employeeList = employeeService.getAllEmployees();

            reqRes.setStatusCode(200);
            reqRes.setMessage("Employees retrieved successfully.");
            reqRes.setEmployeeList(employeeList);

            return ResponseEntity.ok(reqRes); // Return HTTP 200 with employees list

        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while retrieving employees: " + e.getMessage());

            return ResponseEntity.status(500).body(reqRes); // Return HTTP 500 with error message
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable String id) {
        try {
            EmployeeDTO employeeDTO = employeeService.getEmployeeById(id);
            return ResponseEntity.ok(employeeDTO); // Return HTTP 200 with EmployeeDTO
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // Return HTTP 404 if not found
        }
    }
    @PostMapping("/register")
    public ResponseEntity<ReqRes> registerEmployee(@RequestBody RegisterDTO registerRequest) {
//        System.out.println("register request");
//        System.out.println(registerRequest.toString());
        ReqRes reqRes = employeeService.registerEmployee(registerRequest);

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
    @PutMapping("/profile/update")
    public ResponseEntity<ReqRes> updateProfile(@RequestBody EmployeeProfile updatedProfile, Principal principal) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserId = principal.getName(); // Assuming the ID is stored as the username in authentication

        ReqRes response = employeeService.updateProfile(loggedInUserId, updatedProfile);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



    @PutMapping("/update/{id}") // Ensure the variable name matches
    public ResponseEntity<ReqRes> updateEmployee(@PathVariable("id") String employeeId,
                                                 @Valid @RequestBody EmployeeDTO employeeDTO) {
        ReqRes reqRes = employeeService.updateEmployee(employeeId, employeeDTO); // ✅ Now using the correct variable

        if (reqRes.getStatusCode() == 200) {
            return new ResponseEntity<>(reqRes, HttpStatus.OK);
        } else if (reqRes.getStatusCode() == 404) {
            return new ResponseEntity<>(reqRes, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Delete an employee by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ReqRes> deleteEmployee(@PathVariable String id) {
        ReqRes reqRes = employeeService.deleteEmployee(id);

        if (reqRes.getStatusCode() == 200) {
            return new ResponseEntity<>(reqRes, HttpStatus.OK);
        } else if (reqRes.getStatusCode() == 404) {
            return new ResponseEntity<>(reqRes, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(reqRes, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/generate-id")
    public String generatedEmployeeId() {
        return employeeService.generateEmployeeId();
    }
}


   
