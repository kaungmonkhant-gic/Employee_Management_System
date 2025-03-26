package ems.com.ems_project.service.impl;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.*;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.*;
import ems.com.ems_project.service.EmployeeLeaveService;
import ems.com.ems_project.service.EmployeeSalaryService;
import ems.com.ems_project.service.EmployeeService;
import ems.com.ems_project.service.JWTUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ems.com.ems_project.config.PasswordEncoderConfig;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSalaryService employeeSalaryService;
    @Autowired
    private EmployeeLeaveService employeeLeaveService;

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DepartmentsRepository departmentRepository;
    @Autowired
    private RolesRepository roleRepository;
    @Autowired
    private PositionsRepository positionRepository;
    @Autowired
    private EmployeeSalaryService salaryService;
    @Autowired
    private PositionSalaryRepository positionSalaryRepository;
    @Autowired
    private GenerateId generateId;

    @Autowired
    private JWTUtils jwtutils;

    public List<EmployeeDTO> getActiveEmployeesBasedOnRole(String token) {
        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the employee's details
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch active employees based on role
        List<Employee> employees;
        if ("Admin".equals(roleName)) {
            // Admin: Get all active employees
            employees = employeeRepository.findActiveEmployees();
        } else if ("Manager".equals(roleName)) {
            // Manager: Get active employees from their department
            String departmentId = employee.getDepartment().getId();
            employees = employeeRepository.findActiveEmployeesByDepartmentId(departmentId);
        } else {
            return Collections.emptyList(); // Other roles don't have access
        }
//
//        // Exclude logged-in employee from the list
//        employees = employees.stream()
//                .filter(emp -> !emp.getId().equals(employee.getId()))
//                .collect(Collectors.toList());

        // Convert to DTO and return
        return employees.stream()
                .map(EmployeeDTO::new)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getResignedEmployeesBasedOnRole(String token) {
        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the employee's details
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch resigned employees based on role
        List<Employee> employees;
        if ("Admin".equals(roleName)) {
            // Admin: Get all resigned employees
            employees = employeeRepository.findResignedEmployees();
        } else if ("Manager".equals(roleName)) {
            // Manager: Get resigned employees from their department
            String departmentId = employee.getDepartment().getId();
            employees = employeeRepository.findResignedEmployeesByDepartmentId(departmentId);
        } else {
            return Collections.emptyList(); // Other roles don't have access
        }

        // Convert to DTO and return
        return employees.stream()
                .map(EmployeeDTO::new)
                .collect(Collectors.toList());
    }

    public long getActiveEmployeeCountBasedOnRole(String token) {
        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the employee's details
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long count;
        if ("Admin".equals(roleName)) {
            // Admin: Get count of all active employees
            count = employeeRepository.countActiveEmployees();
        } else if ("Manager".equals(roleName)) {
            // Manager: Get count of active employees from the same department
            String departmentId = employee.getDepartment().getId();
            count = employeeRepository.countActiveEmployeesByDepartmentId(departmentId);
        } else {
            return 0; // Other roles don't have access
        }

        return count;
    }
    public long getActiveManagersCount() {
        return employeeRepository.countActiveManagers("ROLE 2");
    }


    @Override
    public EmployeeDTO getEmployeeById(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return new EmployeeDTO(employee);
    }

    public ReqRes getLoggedInEmployeeProfile() {
        // Get the logged-in user's email
        String loggedInUsername = getLoggedInUsername();  // This method fetches the logged-in user's email

        try {
            // Fetch employee details from the database
            Employee employee = employeeRepository.findByEmail(loggedInUsername)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

            // Convert Employee entity to EmployeeDTO
            EmployeeDTO employeeProfile = new EmployeeDTO(employee);

            // Create and return a ReqRes response with the employee profile
            ReqRes response = new ReqRes();
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Employee profile retrieved successfully.");
            response.setEmployeeProfile(employeeProfile);  // Include the employeeDTO in the response

            return response;
        } catch (ResponseStatusException e) {
            // Handle known errors, such as employee not found
            throw e;
        } catch (Exception e) {
            // Catch any unexpected errors and throw an exception for the controller to handle
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while retrieving the employee profile", e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> employee = employeeRepository.findByEmail(username);

        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("Employee not found with email: " + username);
        }

        Employee emp = employee.get();

        // Handle roles (assuming one role per employee)
        String roleName = emp.getRoleName();


        return User.builder()
                .username(emp.getEmail())
                .password(emp.getPassword()) // Hashed password from the database
                .roles(roleName)// Uncomment if roles are used
                .build();
    }


    // Get Count of Active Employees (resignDate is null)
    public long getActiveEmployeeCount() {
        return employeeRepository.countActiveEmployees();
    }

    // Get Count of Resigned Employees (resignDate is not null)
    public long getResignedEmployeeCount() {
        return employeeRepository.countResignedEmployees();
    }

    @Override
    public ReqRes updateEmployeeProfile(EmployeeDTO employeeDTO) {
        ReqRes reqRes = new ReqRes();

        // Get the logged-in user's email
       String loggedInUsername = getLoggedInUsername();  // Adjust as per your auth setup

        Optional<Employee> existingEmployee = employeeRepository.findByEmail(loggedInUsername);
        if (existingEmployee.isEmpty()) {
            reqRes.setStatusCode(404);
            reqRes.setMessage("Employee not found with email: " + loggedInUsername);
            return reqRes;
        }

        try {
            Employee employee = existingEmployee.get();

            if (employee.getResignDate() != null) {
                reqRes.setStatusCode(400);  // Bad Request
                reqRes.setMessage("Cannot update. Employee has already resigned on " + employee.getResignDate());
                return reqRes;
            }

            // Update employee details (only non-null values)
            if (employeeDTO.getName() != null) employee.setName(employeeDTO.getName());
            if (employeeDTO.getPhone() != null) employee.setPhone(employeeDTO.getPhone());
            if (employeeDTO.getGender() != null) employee.setGender(employeeDTO.getGender());
            if (employeeDTO.getDob() != null) employee.setDob(employeeDTO.getDob());
            if (employeeDTO.getNrc() != null) employee.setNrc(employeeDTO.getNrc());
            if (employeeDTO.getMaritalStatus() != null) employee.setMaritalStatus(employeeDTO.getMaritalStatus());
            if (employeeDTO.getAddress() != null) employee.setAddress(employeeDTO.getAddress());
            if (employeeDTO.getWorkExp() != null) employee.setWorkExp(employeeDTO.getWorkExp());
            if (employeeDTO.getEducation() != null) employee.setEducation(employeeDTO.getEducation());
            if (employeeDTO.getJoinDate() != null) employee.setJoinDate(employeeDTO.getJoinDate());

            // Update department, position, and role if provided
            if (employeeDTO.getDepartmentName() != null) {
                departmentRepository.findByDepartmentName(employeeDTO.getDepartmentName()).ifPresent(employee::setDepartment);
            }
            if (employeeDTO.getPositionName() != null) {
                positionRepository.findByPositionName(employeeDTO.getPositionName()).ifPresent(employee::setPosition);
            }
            if (employeeDTO.getRoleName() != null) {
                roleRepository.findByRoleName(employeeDTO.getRoleName()).ifPresent(employee::setRole);
            }

            // Hash and update password if provided
            if (employeeDTO.getPassword() != null && !employeeDTO.getPassword().isEmpty()) {
                String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(employeeDTO.getPassword());
                employee.setPassword(hashedPassword);
            }

            employeeRepository.save(employee);

            reqRes.setStatusCode(200);
            reqRes.setMessage("Profile updated successfully.");
        } catch (Exception e) {
            System.err.println("Error updating profile: " + e.getMessage());
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while updating the profile: " + e.getMessage());
        }

        return reqRes;
    }

    @Override
    public ReqRes registerEmployee(RegisterDTO registerDTO) {
        System.out.println("Employee Registration Start");
        ReqRes reqRes = new ReqRes();

        try {
            // Validate email
            if (registerDTO.getEmail() == null || registerDTO.getEmail().trim().isEmpty()) {
                return createErrorResponse(400, "Email is required.");
            }

            // Check if employee already exists
            if (employeeRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
                return createErrorResponse(409, "Employee with email " + registerDTO.getEmail() + " already exists.");
            }

            // Fetch related entities
            Roles role = roleRepository.findById(registerDTO.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found for ID: " + registerDTO.getRoleId()));

            Departments department = departmentRepository.findById(registerDTO.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found for ID: " + registerDTO.getDepartmentId()));

            Positions position = positionRepository.findById(registerDTO.getPositionId())
                    .orElseThrow(() -> new RuntimeException("Position not found for ID: " + registerDTO.getPositionId()));

            // Fetch the PositionSalary based on employee's position
            PositionSalary positionSalary = positionSalaryRepository.findByPositionId(position.getId());
            if (positionSalary == null) {
                throw new RuntimeException("Salary details not found for position: " + position.getPositionName());
            }

            // Create new Employee
            Employee employee = new Employee();
            employee.setId(generateEmployeeId());
            System.out.println("id");
            employee.setEmail(registerDTO.getEmail().trim());
            System.out.println("email");
            employee.setName(registerDTO.getName());
            System.out.println("name");
            employee.setPhone(registerDTO.getPhone());
            System.out.println("phone");
            employee.setGender(registerDTO.getGender());
            System.out.println("gender");
            employee.setDob(registerDTO.getDob());
            System.out.println("dob");
            employee.setNrc(registerDTO.getNrc());
            System.out.println("nrc");
            employee.setMaritalStatus(registerDTO.getMaritalStatus());
            System.out.println("marital");
            employee.setAddress(registerDTO.getAddress());
            System.out.println("address");
            employee.setWorkExp(registerDTO.getWorkExp());
            System.out.println("workExp");
            employee.setEducation(registerDTO.getEducation());
            System.out.println("Education");
            employee.setJoinDate(registerDTO.getJoinDate());
            System.out.println("join");

            // Set related entities
            employee.setRole(role);
            System.out.println("role");
            employee.setDepartment(department);
            System.out.println("department");
            employee.setPosition(position);
            System.out.println("position");
            employee.setPositionSalary(positionSalary); // Link PositionSalary directly
            System.out.println("positionSalary set");

            // Encode password
            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(registerDTO.getPassword());
            employee.setPassword(hashedPassword);

            // Assign Manager (if applicable)
            Employee manager = null;
            if (!role.getRoleName().equalsIgnoreCase("Manager")) {
                manager = employeeRepository.findByDepartmentAndRole(department.getId(), "Role 2").orElse(null);
            }
            employee.setManager(manager);

            // Save Employee
            Employee savedEmployee = employeeRepository.save(employee);
            System.out.println("save");

            EmployeeLeave employeeLeave =employeeLeaveService.createEmployeeLeave(savedEmployee);

            // Success Response
            reqRes.setEmployee(savedEmployee);
            System.out.println("response");
            reqRes.setEmployeeLeave(employeeLeave);
            reqRes.setStatusCode(201);
            reqRes.setMessage("Employee registered successfully.");
            System.out.println("Employee Registration Successful: " + savedEmployee.getEmail());

        } catch (RuntimeException e) {
            System.err.println("Validation Error during registration: " + e.getMessage());
            return createErrorResponse(400, e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected Error during registration: " + e.getMessage());
            e.printStackTrace();
            return createErrorResponse(500, "An internal error occurred during registration.");
        }
        return reqRes;
    }

    /**
     * Helper method to create an error response.
     */
    private ReqRes createErrorResponse(int statusCode, String message) {
        ReqRes reqRes = new ReqRes();
        reqRes.setStatusCode(statusCode);
        reqRes.setMessage(message);
        return reqRes;
    }


    @Override
    public ReqRes updateEmployee(String id, EmployeeDTO employeeDTO) {
        ReqRes reqRes = new ReqRes();

        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isEmpty()) {
            reqRes.setStatusCode(404);
            reqRes.setMessage("Employee not found with ID: " + id);
            return reqRes;
        }

        try {
            Employee employee = existingEmployee.get();

            if (employee.getResignDate() != null) {
                reqRes.setStatusCode(400);  // Bad Request
                reqRes.setMessage("Cannot update. Employee has already resigned on " + employee.getResignDate());
                return reqRes;
            }

            // Update employee details
            if (employeeDTO.getEmail() != null && !employeeDTO.getEmail().isEmpty()) {
                employee.setEmail(employeeDTO.getEmail());
            }
            if (employeeDTO.getName() != null) {
                employee.setName(employeeDTO.getName());
            }
            if (employeeDTO.getPhone() != null) {
                employee.setPhone(employeeDTO.getPhone());
            }
            if (employeeDTO.getGender() != null) {
                employee.setGender(employeeDTO.getGender());
            }
            if (employeeDTO.getDob() != null) {
                employee.setDob(employeeDTO.getDob());
            }
            if (employeeDTO.getNrc() != null) {
                employee.setNrc(employeeDTO.getNrc());
            }
            if (employeeDTO.getMaritalStatus() != null) {
                employee.setMaritalStatus(employeeDTO.getMaritalStatus());
            }
            if (employeeDTO.getAddress() != null) {
                employee.setAddress(employeeDTO.getAddress());
            }
            if (employeeDTO.getWorkExp() != null) {
                employee.setWorkExp(employeeDTO.getWorkExp());
            }
            if (employeeDTO.getEducation() != null) {
                employee.setEducation(employeeDTO.getEducation());
            }
            if (employeeDTO.getJoinDate() != null) {
                employee.setJoinDate(employeeDTO.getJoinDate());
            }

            // Update department, position, and role if provided
            if (employeeDTO.getDepartmentName() != null) {
                departmentRepository.findByDepartmentName(employeeDTO.getDepartmentName()).ifPresent(employee::setDepartment);
            }
            if (employeeDTO.getPositionName() != null) {
                positionRepository.findByPositionName(employeeDTO.getPositionName()).ifPresent(newPosition -> {
                    // Update the employee's position
                    employee.setPosition(newPosition);

                    // Fetch the PositionSalary based on employee's position
                    PositionSalary positionSalary = positionSalaryRepository.findByPositionId(newPosition.getId());

                    // If no PositionSalary is found for the position, throw an exception
                    if (positionSalary == null) {
                        throw new RuntimeException("Salary details not found for position: " + newPosition.getPositionName());
                    }

                    // Set the PositionSalary for the employee
                    employee.setPositionSalary(positionSalary);
                });
            }


            if (employeeDTO.getRoleName() != null) {
                roleRepository.findByRoleName(employeeDTO.getRoleName()).ifPresent(employee::setRole);
            }

            // Hash and update the password if provided
            if (employeeDTO.getPassword() != null && !employeeDTO.getPassword().isEmpty()) {
                String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(employeeDTO.getPassword());
                employee.setPassword(hashedPassword);
            }

            employeeRepository.save(employee);

            reqRes.setStatusCode(200);
            reqRes.setMessage("Employee updated successfully.");
        } catch (Exception e) {
            System.err.println("Error updating employee: " + e.getMessage());
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while updating the employee: " + e.getMessage());
        }

        return reqRes;
    }


    @Override
    @Transactional
    public ReqRes deleteEmployee(String Id) {
        ReqRes reqRes = new ReqRes();
        // Check if the employee exists
        Optional<Employee> existingEmployee = employeeRepository.findById(Id);
        if (existingEmployee.isPresent()) {
            Employee employee = existingEmployee.get();
            System.out.println("!!!!2!!!!");

            // Check if employee is already resigned
            if (employee.getResignDate() != null) {
                reqRes.setStatusCode(400);  // Bad Request
                reqRes.setMessage("Employee has already resigned on " + employee.getResignDate());
                return reqRes;
            }

            // Set the resignDate (current date)
            employee.setResignDate(LocalDate.now());// Stores current date
            employeeRepository.save(employee);

            reqRes.setStatusCode(200);  // Success
            reqRes.setMessage("Employee marked as resigned on " + employee.getResignDate());
        } else {
            reqRes.setStatusCode(404);  // Not Found
            reqRes.setMessage("Employee not found with ID: " + Id);
        }

        return reqRes;
    }

    @Override
    public ReqRes updatePassword(PasswordDTO passwordDTO) {
        ReqRes reqRes = new ReqRes();

        // Get the logged-in user's email
        String loggedInUsername = getLoggedInUsername();

        // Find the existing employee by email
        Optional<Employee> existingEmployee = employeeRepository.findByEmail(loggedInUsername);
        if (existingEmployee.isEmpty()) {
            reqRes.setStatusCode(404);
            reqRes.setMessage("Employee not found with email: " + loggedInUsername);
            return reqRes;
        }

        try {
            Employee employee = existingEmployee.get();

            // Check if the old password matches the stored password
            if (!passwordEncoderConfig.passwordEncoder().matches(passwordDTO.getCurrentPassword(), employee.getPassword())) {
                reqRes.setStatusCode(400);
                reqRes.setMessage("Old password is incorrect.");
                return reqRes;
            }

            // Check if the new password and confirm password are the same
            if (!passwordDTO.getNewPassword().equals(passwordDTO.getConfirmPassword())) {
                reqRes.setStatusCode(400);
                reqRes.setMessage("New password and confirm password do not match.");
                return reqRes;
            }

            // Validate new password (e.g., check length, complexity, etc.)
            if (passwordDTO.getNewPassword().length() < 6) {
                reqRes.setStatusCode(400);
                reqRes.setMessage("New password must be at least 6 characters long.");
                return reqRes;
            }

            // Hash and update the new password
            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(passwordDTO.getNewPassword());
            employee.setPassword(hashedPassword);

            // Save the updated employee object
            employeeRepository.save(employee);

            reqRes.setStatusCode(200);
            reqRes.setMessage("Password updated successfully.");
        } catch (Exception e) {
            System.err.println("Error updating password: " + e.getMessage());
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while updating the password: " + e.getMessage());
        }

        return reqRes;
    }

    // Helper method to get logged-in username (email) from JWT
    private String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }


    public String generateEmployeeId() {
        // Get the last Employee ID from the database
        Optional<String> lastIdOptional = employeeRepository.findLastEmployeeId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "EMP";

        // Generate the new Employee ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }
}