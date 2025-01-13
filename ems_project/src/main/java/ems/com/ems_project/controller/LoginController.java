package ems.com.ems_project.controller;

import ems.com.ems_project.dto.LoginRequest;
import ems.com.ems_project.dto.LoginResponse;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.service.LoginService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    // User registration
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(loginService.register(loginRequest));
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(loginService.login(loginRequest));
    }
    
//    // Get current user's profile
//    @GetMapping("/profile")
//    public ResponseEntity<LoginResponse> getProfile() {
//        return ResponseEntity.ok(loginService.getProfile());
//    }
}
