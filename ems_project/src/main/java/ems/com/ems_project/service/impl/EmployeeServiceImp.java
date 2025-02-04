package ems.com.ems_project.service.impl;
import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.*;
import ems.com.ems_project.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ems.com.ems_project.config.PasswordEncoderConfig;
import org.springframework.web.server.ResponseStatusException;

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
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig; // Use PasswordEncoderConfig for encoding

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private DepartmentsRepository departmentRepository;
    @Autowired
    private RolesRepository roleRepository;
    @Autowired
    private PositionsRepository positionRepository;

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
    public ReqRes getAllEmployees() {
        ReqRes reqRes = new ReqRes();
        try {
            List<Employee> employees = employeeRepository.findAll();

            // Map Employees to EmployeeDTO and fetch salary & leave details
            List<EmployeeDTO> employeeDTO = employees.stream().map(employee -> {
                EmployeeDTO dto = modelMapper.map(employee, EmployeeDTO.class);

                // Fetch salary details from EmployeeSalary table
                employeeSalaryRepository.findByEmployeeId(employee.getId()).ifPresent(salary -> {
                    dto.setBasicSalary(salary.getBasicSalary());
                    dto.setHouseAllowance(salary.getHouseAllowance());
                    dto.setTransportation(salary.getTransportation());
                    dto.setTotalSalary(salary.getTotalSalary());
                });

                // Fetch leave details from EmployeeLeave table
                employeeLeaveRepository.findByEmployeeId(employee.getId()).ifPresent(leave -> {
                    dto.setAnnualLeave(leave.getAnnualLeave());
                    dto.setCasualLeave(leave.getCasualLeave());
                    dto.setMedicalLeave(leave.getMedicalLeave());
                    dto.setTotalLeave(leave.getTotal());
                });

                return dto;
            }).collect(Collectors.toList());

            // Set response data with EmployeeDTO list
            reqRes.setEmployeeList(employeeDTO);  // Set the list of EmployeeDTOs
            reqRes.setStatusCode(200);
            reqRes.setMessage("Employees retrieved successfully.");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while retrieving employees: " + e.getMessage());
        }
        return reqRes;
    }


    @Override
    public EmployeeDTO getEmployeeById(String id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found with ID: " + id));

        // Map Employee to EmployeeDTO using ModelMapper
        EmployeeDTO employeeDTO = modelMapper.map(employee, EmployeeDTO.class);

        // Fetch salary details if available
        employeeSalaryRepository.findByEmployeeId(employee.getId()).ifPresent(salary -> {
            employeeDTO.setBasicSalary(salary.getBasicSalary());
            employeeDTO.setHouseAllowance(salary.getHouseAllowance()) ;
            employeeDTO.setTransportation(salary.getTransportation());
            employeeDTO.setTotalSalary(salary.getTotalSalary());
        });

        // Fetch leave details if available
        employeeLeaveRepository.findByEmployeeId(employee.getId()).ifPresent(leave -> {
            employeeDTO.setAnnualLeave(leave.getAnnualLeave());
            employeeDTO.setCasualLeave(leave.getCasualLeave());
            employeeDTO.setMedicalLeave(leave.getMedicalLeave());
            employeeDTO.setTotalLeave(leave.getTotal());
        });

        return employeeDTO;
    }


    @Override
    public ReqRes updateProfile(String email, EmployeeProfile updatedProfile) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Employee> userOptional = employeeRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                Employee employee = userOptional.get();

                // Use ModelMapper to update Employee with the new values from EmployeeProfile
                modelMapper.map(updatedProfile, employee);

                // Save the updated employee to the database
                Employee updatedEmployee = employeeRepository.save(employee);

                // Map the updated Employee entity to EmployeeProfile DTO
                EmployeeProfile employeeProfile = modelMapper.map(updatedEmployee, EmployeeProfile.class);

                // Prepare response with updated profile
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
            Optional<Departments> department = departmentRepository.findById(registerDTO.getDepartmentId());
            Optional<Positions> position = positionRepository.findById(registerDTO.getPositionId());
            Optional<Roles> role = roleRepository.findById(registerDTO.getRoleId());

            // Ensure that department, position, and role exist
            if (department.isEmpty()) {
                reqRes.setStatusCode(400); // Bad Request
                reqRes.setMessage("Department not found.");
                return reqRes;
            }

            if (position.isEmpty()) {
                reqRes.setStatusCode(400); // Bad Request
                reqRes.setMessage("Position not found.");
                return reqRes;
            }

            if (role.isEmpty()) {
                reqRes.setStatusCode(400); // Bad Request
                reqRes.setMessage("Role not found.");
                return reqRes;
            }

            // Create new Employee entity
            Employee employee = new Employee();
            employee.setId(registerDTO.getId());  // If ID is provided, use it; otherwise, auto-generate.
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
            employee.setRole(role.get());
            employee.setDepartment(department.get());
            employee.setPosition(position.get());

            // Hash the password
            if (registerDTO.getPassword() == null || registerDTO.getPassword().isEmpty()) {
                reqRes.setStatusCode(400); // Bad Request
                reqRes.setMessage("Password is required.");
                return reqRes;
            }

            String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(registerDTO.getPassword());
            employee.setPassword(hashedPassword);

            // Save the employee
            Employee savedEmployee = employeeRepository.save(employee);

            // Save EmployeeSalary entity
            EmployeeSalary employeeSalary = new EmployeeSalary();
            employeeSalary.setEmployee(savedEmployee);
            employeeSalary.setBasicSalary(registerDTO.getBasicSalary());
            employeeSalary.setHouseAllowance(registerDTO.getHouseAllowance());
            employeeSalary.setTransportation(registerDTO.getTransportation());
            employeeSalaryRepository.save(employeeSalary);

            EmployeeLeave employeeLeave = new EmployeeLeave();
            employeeLeave.setEmployee(savedEmployee);
            employeeLeave.setAnnualLeave(registerDTO.getAnnualLeave());
            employeeLeave.setCasualLeave(registerDTO.getCasualLeave());
            employeeLeave.setMedicalLeave(registerDTO.getMedicalLeave());
            employeeLeave.setTotal(registerDTO.getTotalLeave());
            employeeLeaveRepository.save(employeeLeave);

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
    public ReqRes updateEmployee(String employeeId, Employee employee) {
        ReqRes reqRes = new ReqRes();

        try {
            // Fetch the existing employee by ID
            Optional<Employee> existingEmployeeOptional = employeeRepository.findById(employeeId);
            if (existingEmployeeOptional.isPresent()) {
                Employee existingEmp = existingEmployeeOptional.get();

                // Update basic fields
                existingEmp.setName(employee.getName());
                existingEmp.setEmail(employee.getEmail());
                existingEmp.setPhone(employee.getPhone());
                existingEmp.setAddress(employee.getAddress());

                // Update foreign key references (IDs)
                existingEmp.setDepartmentId(employee.getDepartmentId());  // Just set the department ID
                existingEmp.setPositionId(employee.getPositionId());      // Just set the position ID
                existingEmp.setRoleId(employee.getRoleId());              // Just set the role ID

                // Optionally update password if provided
                if (employee.getPassword() != null && !employee.getPassword().isEmpty()) {
                    String hashedPassword = passwordEncoderConfig.passwordEncoder().encode(employee.getPassword());
                    existingEmp.setPassword(hashedPassword);
                }

                // Save the updated employee
                Employee updatedEmployee = employeeRepository.save(existingEmp);
                reqRes.setEmployee(updatedEmployee);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Employee updated successfully.");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found.");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while updating the employee: " + e.getMessage());
        }

        return reqRes;
    }

    // Delete employee
    @Override
    public ReqRes deleteEmployee(String Id) {
        ReqRes reqRes = new ReqRes();

        // Check if the employee exists
        Optional<Employee> existingEmployee = employeeRepository.findById(Id);
        if (existingEmployee.isPresent()) {
            employeeRepository.delete(existingEmployee.get());

            reqRes.setStatusCode(200);  // Success
            reqRes.setMessage("Employee deleted successfully.");
        } else {
            reqRes.setStatusCode(404);  // Not Found
            reqRes.setMessage("Employee not found with ID: " + Id);
        }

        return reqRes;
    }
}
