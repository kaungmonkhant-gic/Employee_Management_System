package ems.com.ems_project.service.impl;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.*;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.*;
import ems.com.ems_project.service.EmployeeLeaveService;
import ems.com.ems_project.service.EmployeeSalaryService;
import ems.com.ems_project.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ems.com.ems_project.config.PasswordEncoderConfig;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(employee -> {

                    // Fetch salary details from EmployeeSalary table
                    EmployeeSalary salary = employeeSalaryRepository.findByEmployeeId(employee.getId()).orElse(null);

                    // Fetch leave details from EmployeeLeave table
                    EmployeeLeave leave = employeeLeaveRepository.findByEmployeeId(employee.getId()).orElse(null);

                    // Convert to DTO
                    return new EmployeeDTO(employee,leave, salary);
                })
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        // Fetch salary details
        EmployeeSalary salary = employeeSalaryRepository.findByEmployeeId(employeeId).orElse(null);

        // Fetch leave details
        EmployeeLeave leave = employeeLeaveRepository.findByEmployeeId(employeeId).orElse(null);

        return new EmployeeDTO(employee, leave, salary);
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

    @Override
    public ReqRes registerEmployee(RegisterDTO registerDTO) {
        System.out.println("Employee Register Start");
        ReqRes reqRes = new ReqRes();

        // Check for missing email
        if (registerDTO.getEmail() == null || registerDTO.getEmail().isEmpty()) {
            reqRes.setStatusCode(400); // Bad Request
            reqRes.setMessage("Email is required.");
            return reqRes;
        }

        // Check for duplicate email
        Optional<Employee> existingEmployee = employeeRepository.findByEmail(registerDTO.getEmail());
        if (existingEmployee.isPresent()) {
            reqRes.setStatusCode(409); // Conflict
            reqRes.setMessage("Employee with email " + registerDTO.getEmail() + " already exists.");
            return reqRes;
        }

        try {
            // Fetch department, position, and role from repositories
            Roles role = roleRepository.findById(registerDTO.getRoleId()).orElseThrow(() -> new RuntimeException("Role not found"));
            Departments department = departmentRepository.findById(registerDTO.getDepartmentId()).orElseThrow(() -> new RuntimeException("Department not found"));
            Positions position = positionRepository.findById(registerDTO.getPositionId()).orElseThrow(() -> new RuntimeException("Position not found"));

            // Create new Employee entity
            Employee employee = new Employee();
            employee.setId(generateEmployeeId());  // If ID is provided, use it; otherwise, auto-generate.
            employee.setEmail(registerDTO.getEmail());
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

            // Set the role, department, and position
            employee.setRole(role);
            employee.setDepartment(department);
            employee.setPosition(position);

            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(registerDTO.getPassword());
            employee.setPassword(hashedPassword);

            // Save the employee
            Employee savedEmployee = employeeRepository.save(employee);

            // Save EmployeeSalary and EmployeeLeave entities
            employeeSalaryService.createEmployeeSalary(savedEmployee, registerDTO);
            employeeLeaveService.createEmployeeLeave(savedEmployee, registerDTO);

            // Fetch the EmployeeLeave and EmployeeSalary entities
            EmployeeLeaveDTO employeeLeaveDTO = employeeLeaveService.getEmployeeLeaveById(savedEmployee.getId());
            EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryService.getEmployeeSalaryById(savedEmployee.getId());

            if (employeeSalaryDTO != null) {
                employeeSalaryService.createEmployeeSalary(savedEmployee, registerDTO);
            }

            if (employeeLeaveDTO != null) {
                employeeLeaveService.createEmployeeLeave(savedEmployee, registerDTO);
            }

            // Set response details
            reqRes.setEmployee(savedEmployee);
            reqRes.setStatusCode(201); // Created
            reqRes.setMessage("Employee registered successfully.");
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.err.println("Error during registration: " + e.getMessage());
            reqRes.setStatusCode(500); // Internal Server Error
            reqRes.setMessage("An error occurred during registration: " + e.getMessage());
        }
        return reqRes;
    }

    @Override
    public ReqRes updateEmployee(String Id, EmployeeDTO employeeDTO) {
        ReqRes reqRes = new ReqRes();

        Optional<Employee> existingEmployee = employeeRepository.findById(Id);
        if (existingEmployee.isEmpty()) {
            reqRes.setStatusCode(404);
            reqRes.setMessage("Employee not found with ID: " + Id);
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

            // Update Employee Salary
            Optional<EmployeeSalary> existingSalary = employeeSalaryRepository.findByEmployeeId(Id);
            EmployeeSalary employeeSalary = existingSalary.orElse(new EmployeeSalary());
            if (employeeDTO.getBasicSalary() != null) {
                employeeSalary.setBasicSalary(employeeDTO.getBasicSalary());
            }
            if (employeeDTO.getHouseAllowance() != null) {
                employeeSalary.setHouseAllowance(employeeDTO.getHouseAllowance());
            }
            if (employeeDTO.getTransportation() != null) {
                employeeSalary.setTransportation(employeeDTO.getTransportation());
            }
            employeeSalary.setEmployee(employee);
            employeeSalaryRepository.save(employeeSalary);

            // Update Employee Leave
            Optional<EmployeeLeave> existingLeave = employeeLeaveRepository.findByEmployeeId(Id);
            EmployeeLeave employeeLeave = existingLeave.orElse(new EmployeeLeave());
            if (employeeDTO.getAnnualLeave() != null) {
                employeeLeave.setAnnualLeave(employeeDTO.getAnnualLeave());
            }
            if (employeeDTO.getCasualLeave() != null) {
                employeeLeave.setCasualLeave(employeeDTO.getCasualLeave());
            }
            if (employeeDTO.getMedicalLeave() != null) {
                employeeLeave.setMedicalLeave(employeeDTO.getMedicalLeave());
            }
            // Calculate totalLeave dynamically
            double totalLeave = (employeeLeave.getAnnualLeave() != null ? employeeLeave.getAnnualLeave() : 0.0) +
                    (employeeLeave.getCasualLeave() != null ? employeeLeave.getCasualLeave() : 0.0) +
                    (employeeLeave.getMedicalLeave() != null ? employeeLeave.getMedicalLeave() : 0.0);

            employeeLeave.setTotal(totalLeave);
            employeeLeave.setEmployee(employee);
            employeeLeaveRepository.save(employeeLeave);

            // Calculate total salary
            double totalSalary = (employeeSalary.getBasicSalary() != null ? employeeSalary.getBasicSalary() : 0.0) +
                    (employeeSalary.getHouseAllowance() != null ? employeeSalary.getHouseAllowance() : 0.0) +
                    (employeeSalary.getTransportation() != null ? employeeSalary.getTransportation() : 0.0);

            // Set success response
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
