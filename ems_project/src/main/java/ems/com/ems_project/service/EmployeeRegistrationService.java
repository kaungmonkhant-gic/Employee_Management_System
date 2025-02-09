package ems.com.ems_project.service;

import ems.com.ems_project.model.*;
import ems.com.ems_project.dto.EmployeeRegisterDTO;
import ems.com.ems_project.mapper.EmployeeMapper;
import ems.com.ems_project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional // All operations run in one transaction
public class EmployeeRegistrationService {

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private DepartmentsRepository departmentRepository;

    @Autowired
    private PositionsRepository positionRepository;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> registerEmployee(EmployeeRegisterDTO registerDTO) {
        try {
            // 1. Map and save Employee
            Employee employee = employeeMapper.toEmployee(registerDTO.getEmployee());
            // Encode the default password (or the one provided)
            employee.setPassword(passwordEncoder.encode(registerDTO.getEmployee().getPassword()));

            // Fetch and set Department, Position, and Role
            Departments department = departmentRepository.findById(registerDTO.getEmployee().getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            Positions position = positionRepository.findById(registerDTO.getEmployee().getPosition().getId())
                    .orElseThrow(() -> new RuntimeException("Position not found"));
            Roles role = roleRepository.findById(registerDTO.getEmployee().getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            employee.setDepartment(department);
            employee.setPosition(position);
            employee.setRole(role);

            // Save the employee so that it becomes managed and has an ID assigned.
            Employee savedEmployee = employeeRepository.save(employee);

            // 2. Map and save EmployeeSalary
            EmployeeSalary employeeSalary = employeeMapper.toEmployeeSalary(savedEmployee, registerDTO.getEmployeeSalary());
            // Ensure the EmployeeSalary references the managed Employee instance.
            employeeSalary.setEmployee(savedEmployee);
            employeeSalaryRepository.save(employeeSalary);

            // 3. Map and save EmployeeLeave
            EmployeeLeave employeeLeave = employeeMapper.toEmployeeLeave(savedEmployee, registerDTO.getEmployeeLeave());
            // Ensure the EmployeeLeave references the same Employee.
            employeeLeave.setEmployee(savedEmployee);
            employeeLeaveRepository.save(employeeLeave);

            // 4. Return success response
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "statusCode", 201,
                            "message", "Employee registered successfully.",
                            "data", savedEmployee
                    ));
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "statusCode", 500,
                            "message", "Failed to register employee: " + e.getMessage(),
                            "data", null
                    ));
        }
    }
}
