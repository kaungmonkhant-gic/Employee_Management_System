package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.service.EmployeeService;
import ems.com.ems_project.service.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import javax.validation.Valid;


@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JWTUtils jwtutils;


    @GetMapping("/active")
    public ResponseEntity<List<EmployeeDTO>> getActiveEmployees(@RequestHeader("Authorization") String authorizationHeader) {
        // Extract the JWT token from the Authorization header
        String token = authorizationHeader.replace("Bearer ", "");

        // Call the service method to get active employees based on the role
        List<EmployeeDTO> activeEmployees = employeeService.getActiveEmployeesBasedOnRole(token);

        // If no active employees are found, return a 404 Not Found
        if (activeEmployees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(activeEmployees);
        }

        // Return the list of active employees with a 200 OK status
        return ResponseEntity.ok(activeEmployees);
    }


    @GetMapping("/resigned")
    public ResponseEntity<List<EmployeeDTO>> getResignedEmployees(@RequestHeader("Authorization") String authorizationHeader) {
        // Extract the JWT token from the Authorization header
        String token = authorizationHeader.replace("Bearer ", "");
        List<EmployeeDTO> resignedEmployees = employeeService.getResignedEmployeesBasedOnRole(token);
        if (resignedEmployees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resignedEmployees);
        }
        return ResponseEntity.ok(resignedEmployees);
    }

    // Endpoint to get the count of active employees
    @GetMapping("/active-count")
    public ResponseEntity<Long> getActiveEmployeeCount(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        long count = employeeService.getActiveEmployeeCountBasedOnRole(jwtToken);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/manager-count")
    public ResponseEntity<Long> getActiveManagersCount() {
        long count = employeeService.getActiveManagersCount();
        return ResponseEntity.ok(count);
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
    public ResponseEntity<ReqRes> getLoggedInEmployeeProfile() {
        return ResponseEntity.ok(employeeService.getLoggedInEmployeeProfile());
    }

//    @GetMapping("/profile")
//    public ResponseEntity<?> getProfile() {
//        try {
//            // Get the username (email) of the currently authenticated user
//            String loggedInUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
//            // Fetch the employee details based on the logged-in user's email
//            ReqRes reqRes = employeeService.getProfile(loggedInUserEmail);
//
//            if (reqRes.getStatusCode() == 200) {
//                return ResponseEntity.ok(reqRes);
//            } else {
//                return ResponseEntity.status(reqRes.getStatusCode()).body(reqRes.getMessage());
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error fetching the profile: " + e.getMessage());
//        }
//    }
//    @PutMapping("/profile/update")
//    public ResponseEntity<ReqRes> updateProfile(@RequestBody EmployeeDTO updatedProfile, Principal principal) {
////        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String loggedInUserId = principal.getName(); // Assuming the ID is stored as the username in authentication
//
//        ReqRes response = employeeService.updateProfile(loggedInUserId, updatedProfile);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @PutMapping("/profile/update")
    public ReqRes updateProfile(@RequestBody EmployeeDTO updatedProfile) {
        return employeeService.updateEmployeeProfile(updatedProfile);
    }



    @PutMapping("/update/{id}") // Ensure the variable name matches
    public ResponseEntity<ReqRes> updateEmployee(@PathVariable String id,
                                                 @RequestBody EmployeeDTO employeeDTO) {

        System.out.println("Received employeeDTO: " + employeeDTO);
        ReqRes reqRes = employeeService.updateEmployee(id, employeeDTO); // ✅ Now using the correct variable

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


   
