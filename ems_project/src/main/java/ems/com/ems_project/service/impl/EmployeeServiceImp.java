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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ems.com.ems_project.config.PasswordEncoderConfig;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private  EmployeeSalaryRepository employeeSalaryRepository;

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

    @Override
    public ReqRes getProfile(String email) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Employee> userOptional = employeeRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                Employee employee = userOptional.get();

                // Use ModelMapper to map Employee to EmployeeProfile
                EmployeeProfile employeeProfile = modelMapper.map(employee, EmployeeProfile.class);

                // Prepare response
                reqRes.setEmployeeProfile(employeeProfile);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Profile retrieval successful.");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found.");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while retrieving profile: " + e.getMessage());
        }
        return reqRes;
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
    public ReqRes updateProfile(String loggedInUserId, EmployeeProfile updatedProfile) {
        ReqRes reqRes = new ReqRes();
        try {

            System.out.println("Logged-in User ID: " + loggedInUserId);
            // Fetch logged-in employee by ID (username or user ID)
            Optional<Employee> userOptional = employeeRepository.findByEmail(loggedInUserId);
            if (userOptional.isPresent()) {
                Employee employee = userOptional.get();

                if (employee.getResignDate() != null) {
                    reqRes.setStatusCode(400);  // Bad Request
                    reqRes.setMessage("Cannot update. Employee has already resigned on " + employee.getResignDate());
                    return reqRes;
                }

                // Update fields only if they are provided in the request
                if (updatedProfile.getName() != null) {
                    employee.setName(updatedProfile.getName());
                }
                if (updatedProfile.getDob() != null) {
                    employee.setDob(updatedProfile.getDob());
                }
                if (updatedProfile.getNrc() != null) {
                    employee.setNrc(updatedProfile.getNrc());
                }
                if (updatedProfile.getGender() != null) {
                    employee.setGender(updatedProfile.getGender());
                }
                if (updatedProfile.getMaritalStatus() != null) {
                    employee.setMaritalStatus(updatedProfile.getMaritalStatus());
                }
                if (updatedProfile.getPhone() != null) {
                    employee.setPhone(updatedProfile.getPhone());
                }
                if (updatedProfile.getEmail() != null) {
                    employee.setEmail(updatedProfile.getEmail());
                }
                if (updatedProfile.getAddress() != null) {
                    employee.setAddress(updatedProfile.getAddress());
                }
                if (updatedProfile.getEducation() != null) {
                    employee.setEducation(updatedProfile.getEducation());
                }
                if (updatedProfile.getWorkExp() != null) {
                    employee.setWorkExp(updatedProfile.getWorkExp());
                }
                if (updatedProfile.getJoinDate() != null) {
                    employee.setJoinDate(updatedProfile.getJoinDate());
                }
                if (updatedProfile.getResignDate() != null) {
                    employee.setResignDate(updatedProfile.getResignDate());
                }

                // Update Department if provided
                if (updatedProfile.getDepartmentName() != null) {
                    Optional<Departments> departmentOpt = departmentRepository.findByDepartmentName(updatedProfile.getDepartmentName());
                    departmentOpt.ifPresent(employee::setDepartment);
                }

                // Update Position if provided
                if (updatedProfile.getPositionName() != null) {
                    Optional<Positions> positionOpt = positionRepository.findByPositionName(updatedProfile.getPositionName());
                    positionOpt.ifPresent(employee::setPosition);
                }

                // Update Role if provided
                if (updatedProfile.getRoleName() != null) {
                    Optional<Roles> roleOpt = roleRepository.findByRoleName(updatedProfile.getRoleName());
                    roleOpt.ifPresent(employee::setRole);
                }

                // Save updated employee to the database
                Employee updatedEmployee = employeeRepository.save(employee);

                // Convert updated entity to DTO
                EmployeeProfile employeeProfile = modelMapper.map(updatedEmployee, EmployeeProfile.class);

                reqRes.setEmployeeProfile(employeeProfile);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Profile updated successfully.");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found.");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while updating profile: " + e.getMessage());
        }
        return reqRes;
    }

//    @Override
//    public ReqRes registerEmployee(RegisterDTO registerDTO) {
//        System.out.println("Employee Register Start");
//        ReqRes reqRes = new ReqRes();
//
//        // Check for missing email
//        if (registerDTO.getEmail() == null || registerDTO.getEmail().isEmpty()) {
//            reqRes.setStatusCode(400); // Bad Request
//            reqRes.setMessage("Email is required.");
//            return reqRes;
//        }
//
//        // Check for duplicate email
//        Optional<Employee> existingEmployee = employeeRepository.findByEmail(registerDTO.getEmail());
//        if (existingEmployee.isPresent()) {
//            reqRes.setStatusCode(409); // Conflict
//            reqRes.setMessage("Employee with email " + registerDTO.getEmail() + " already exists.");
//            return reqRes;
//        }
//
//        try {
//            // Fetch department, position, and role from repositories
//            Roles role = roleRepository.findById(registerDTO.getRoleId()).orElseThrow(() -> new RuntimeException("Role not found"));
//            Departments department = departmentRepository.findById(registerDTO.getDepartmentId()).orElseThrow(() -> new RuntimeException("Department not found"));
//            Positions position = positionRepository.findById(registerDTO.getPositionId()).orElseThrow(() -> new RuntimeException("Position not found"));
//
//            // Create new Employee entity
//            Employee employee = new Employee();
//            employee.setId(generateEmployeeId());  // If ID is provided, use it; otherwise, auto-generate.
//            employee.setEmail(registerDTO.getEmail());
//            employee.setName(registerDTO.getName());
//            employee.setPhone(registerDTO.getPhone());
//            employee.setGender(registerDTO.getGender());
//            employee.setDob(registerDTO.getDob());
//            employee.setNrc(registerDTO.getNrc());
//            employee.setMaritalStatus(registerDTO.getMaritalStatus());
//            employee.setAddress(registerDTO.getAddress());
//            employee.setWorkExp(registerDTO.getWorkExp());
//            employee.setEducation(registerDTO.getEducation());
//            employee.setJoinDate(registerDTO.getJoinDate());
//
//            // Set the role, department, and position
//            employee.setRole(role);
//            employee.setDepartment(department);
//            employee.setPosition(position);
//
//            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(registerDTO.getPassword());
//            employee.setPassword(hashedPassword);
//
//            Employee manager = null;
//            if (!role.getRoleName().equalsIgnoreCase("Manager")) {
//                manager = employeeRepository.findByDepartmentAndRole(department.getId(), "Role 2")
//                        .orElse(null);
//            }
//            employee.setManager(manager);
//
//            // Save the employee
//            Employee savedEmployee = employeeRepository.save(employee);
//
//            // Save EmployeeSalary and EmployeeLeave entities
//            employeeSalaryService.createEmployeeSalary(savedEmployee);
//            employeeLeaveService.createEmployeeLeave(savedEmployee);
//
//            reqRes.setEmployee(savedEmployee);
//            reqRes.setStatusCode(201); // Created
//            reqRes.setMessage("Employee registered successfully.");
//        } catch (Exception e) {
//            // Log the exception for debugging purposes
//            System.err.println("Error during registration: " + e.getMessage());
//            reqRes.setStatusCode(500); // Internal Server Error
//            reqRes.setMessage("An error occurred during registration: " + e.getMessage());
//        }
//        return reqRes;
//    }
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

        // Create new Employee
        Employee employee = new Employee();
        employee.setId(generateEmployeeId());
        employee.setEmail(registerDTO.getEmail().trim());
        employee.setName(registerDTO.getName());
        employee.setPhone(registerDTO.getPhone());
        employee.setGender(registerDTO.getGender());
        employee.setDob(registerDTO.getDob());
        employee.setNrc(registerDTO.getNrc());
        employee.setMaritalStatus(registerDTO.getMaritalStatus());
        employee.setAddress(registerDTO.getAddress());
        employee.setWorkExp(registerDTO.getWorkExp());
        employee.setEducation(registerDTO.getEducation());
        employee.setJoinDate(registerDTO.getJoinDate());

        // Set related entities
        employee.setRole(role);
        employee.setDepartment(department);
        employee.setPosition(position);

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

        // Save Employee Salary and Leave Data
        employeeSalaryService.createEmployeeSalary(savedEmployee);
        employeeLeaveService.createEmployeeLeave(savedEmployee);

        // Success Response
        reqRes.setEmployee(savedEmployee);
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
                positionRepository.findByPositionName(employeeDTO.getPositionName()).ifPresent(employee::setPosition);
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
            employee.setResignDate(new Date()); // Stores current date
            employeeRepository.save(employee);

            reqRes.setStatusCode(200);  // Success
            reqRes.setMessage("Employee marked as resigned on " + employee.getResignDate());
        } else {
            reqRes.setStatusCode(404);  // Not Found
            reqRes.setMessage("Employee not found with ID: " + Id);
        }

        return reqRes;
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
