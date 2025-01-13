package ems.com.ems_project.service;

import ems.com.ems_project.dto.LoginRequest;
import ems.com.ems_project.dto.LoginResponse;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.EmployeeRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ems.com.ems_project.config.PasswordEncoderConfig;

@Service
public class LoginService {

    @Autowired
    private EmployeeRepository userRepository;

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;
    
    @Autowired
    private JWTUtils jwtutils;

    public LoginResponse register(LoginRequest loginRequest) {
        // Save user with encoded password
        Employee employee = new Employee();
        employee.setEmail(loginRequest.getEmail());
        employee.setPassword(passwordEncoderConfig.passwordEncoder().encode(loginRequest.getPassword()));
        userRepository.save(employee);

        // Generate token and return response
        String token = generateToken(employee); // Make sure generateToken method handles JWT creation
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        //response.setEmail(employee.getEmail()); // Returning the email to confirm registration
        response.setMessage("Registration Successful");

        return response;
    }


    public LoginResponse login(LoginRequest loginRequest) {
        // Validate user credentials and generate JWT token
        Employee employee = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoderConfig.passwordEncoder().matches(loginRequest.getPassword(), employee.getPassword())) {
            String token = generateToken(employee);
            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setMessage("Login Successful");

            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }

    private String generateToken(Employee employee) {
        // Implement JWT token generation logic
        return jwtutils.generateToken(employee);
    } 

}
