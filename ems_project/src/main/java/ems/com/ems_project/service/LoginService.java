package ems.com.ems_project.service;

import ems.com.ems_project.dto.LoginRequest;
import ems.com.ems_project.dto.LoginResponse;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import ems.com.ems_project.config.PasswordEncoderConfig;

    @Service
    public class LoginService {

        @Autowired
        private EmployeeRepository employeeRepository;

        @Autowired
        private RolesRepository roleRepository; // Add RoleRepository to fetch the role

        @Autowired
        private PasswordEncoderConfig passwordEncoderConfig;
        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private JWTUtils jwtutils;

        public LoginResponse login(LoginRequest loginRequest) {
            // Validate user credentials and generate JWT token
            Employee employee = employeeRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (employee.getResignDate() != null) {
                throw new RuntimeException("Employee has resigned and cannot log in.");
            }

            if (passwordEncoderConfig.passwordEncoder().matches(loginRequest.getPassword(), employee.getPassword())) {
                // Generate JWT token with role name included
                String token = generateToken(employee);

                // Extract role name from JWT token
                String roleName = jwtutils.extractRole(token);

                // Prepare response
                LoginResponse response = new LoginResponse();
                response.setToken(token);
                response.setMessage("Login Successful");
                response.setEmployeeName(employee.getName());
                response.setRoleName(roleName); // Set role name from token

                return response;
            }

            throw new RuntimeException("Invalid credentials");
        }

        private String generateToken(Employee employee) {
            // Implement JWT token generation logic
            return jwtutils.generateToken(employee);
        }
    }