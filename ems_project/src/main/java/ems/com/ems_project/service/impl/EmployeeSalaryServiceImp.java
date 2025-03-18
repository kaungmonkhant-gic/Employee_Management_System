package ems.com.ems_project.service.impl;

import java.util.List;
import java.util.Optional;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.model.PositionSalary;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.repository.*;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private PositionSalaryRepository positionSalaryRepository;
    @Autowired
    private DailyAttendanceRepository attendanceRepository;
    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public List<EmployeeSalaryDTO> getAllSalaries() {
        return employeeSalaryRepository.findAll().stream()
                .filter(employeeSalary -> employeeSalary.getEmployee().getResignDate() == null) // Exclude resigned employees
                .map(employeeSalary -> new EmployeeSalaryDTO(employeeSalary, employeeSalary.getEmployee().getName()))
                .toList();
    }


    public EmployeeSalaryDTO getEmployeeSalaryById(String employeeId) {
        EmployeeSalary employeeSalary = employeeSalaryRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Salary details not found for employee ID: " + employeeId));

        return new EmployeeSalaryDTO(employeeSalary, employeeSalary.getEmployee().getName());
    }


    public EmployeeSalary createEmployeeSalary(Employee employee) {
        System.out.println("Creating salary entry for employee: " + employee.getEmail());

        // Fetch the PositionSalary based on employee's position
        Positions position = employee.getPosition();
        PositionSalary positionSalary = positionSalaryRepository.findByPositionId(position.getId());

        if (positionSalary == null) {
            throw new RuntimeException("Salary details not found for position: " + position.getPositionName());
        }

        System.out.println("Fetching salary details for position: " + position.getPositionName());

        // Create new EmployeeSalary entry
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.setId(generateEmployeeSalaryId()); // Generate unique ID
        employeeSalary.setEmployee(employee);  // Set employee
        employeeSalary.setPositionSalary(positionSalary);  // Set the position salary

        // Optionally, log the details for debugging
        System.out.println("Created salary entry: " + employeeSalary);

        // Save salary details to the repository
        return employeeSalaryRepository.save(employeeSalary);
    }

    public EmployeeSalary updateEmployeeSalary(Employee employee) {
        System.out.println("Updating salary for employee: " + employee.getEmail());

        // Fetch the new PositionSalary based on the updated position
        Positions position = employee.getPosition();
        PositionSalary positionSalary = positionSalaryRepository.findByPositionId(position.getId());

        if (positionSalary == null) {
            throw new RuntimeException("Salary details not found for position: " + position.getPositionName());
        }

        // Find the existing salary entry using employee ID
        Optional<EmployeeSalary> existingSalary = employeeSalaryRepository.findByEmployeeId(employee.getId());
        EmployeeSalary employeeSalary = existingSalary.orElse(new EmployeeSalary());

        // Keep the existing ID if found, otherwise generate a new one
        if (!existingSalary.isPresent()) {
            employeeSalary.setId(generateEmployeeSalaryId());
        }

        employeeSalary.setEmployee(employee); // Set the employee
        employeeSalary.setPositionSalary(positionSalary); // Set the position salary

        System.out.println("Updated salary details for employee: " + employee.getEmail());

        return employeeSalaryRepository.save(employeeSalary);
    }


    public SalaryDTO getEmployeeSalaryDetails(String employeeId) {
        // Fetch the employee details
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Fetch the employee salary details
        EmployeeSalary employeeSalary = employeeSalaryRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Salary details not found"));

        // Fetch the position salary linked to the employee's position
        PositionSalary positionSalary = employeeSalary.getPositionSalary();

        // Fetch the late minutes from the attendance table (if needed)
        Integer lateMinutes = attendanceRepository.findLateMinutesByEmployeeId(employeeId);

        // Fetch the unpaid leave from the leave table (if needed)
        Double unpaidLeave = employeeLeaveRepository.findUnpaidLeaveByEmployeeId(employeeId);

        // Return the DTO with all the necessary data
        return new SalaryDTO(employee, positionSalary, lateMinutes, unpaidLeave);
    }

    @Override
    public String generateEmployeeSalaryId() {
        // Get the last Employee Salary ID from the correct repository
        Optional<String> lastSalaryIdOptional = employeeSalaryRepository.findLastEmployeeSalaryId();

        String lastSalaryId = lastSalaryIdOptional.orElse(null); // If no ID exists, use null

        // Define the correct prefix for Employee Salary ID
        String prefix = "SAL"; // Example: SAL001, SAL002, etc.

        // Generate the new Employee Salary ID using the GenerateId class
        return generateId.generateId(lastSalaryId, prefix);
    }

}
