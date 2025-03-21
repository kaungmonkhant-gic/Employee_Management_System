package ems.com.ems_project.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
    @Autowired
    private OtRepository otRepository;
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

public List<SalaryDTO> getAllEmployeeSalaryDetails(int year, int month) {
    List<EmployeeSalary> employeeSalaries = employeeSalaryRepository.findAll();

    // Calculate the start date (25th of the previous month)
    LocalDate startDate = LocalDate.of(year, month, 1).minusMonths(1).withDayOfMonth(25);

    // Calculate the end date (26th of the current month)
    LocalDate endDate = LocalDate.of(year, month, 1).withDayOfMonth(26);

    return employeeSalaries.stream().map(employeeSalary -> {
        try {
            if (employeeSalary == null || employeeSalary.getEmployee() == null || employeeSalary.getPositionSalary() == null) {
                return null; // Skip invalid records
            }

            String employeeId = employeeSalary.getEmployee().getId();
            String employeeName = employeeSalary.getEmployee().getName();

            // Fetch related records safely, with date range for late minutes
            Integer lateMinutes = attendanceRepository.findTotalLateMinutesByEmployeeIdAndDateRange(employeeId, startDate, endDate);
            Integer otTime = otRepository.findTotalOTTimeByEmployeeIdAndDateRange(employeeId, startDate, endDate);
            Double unpaidLeave = employeeLeaveRepository.findTotalUnpaidLeaveByEmployeeId(employeeId);

            // Handle null cases
            lateMinutes = (lateMinutes != null) ? lateMinutes : 0;
            otTime = (otTime != null) ? otTime : 0;
            unpaidLeave = (unpaidLeave != null) ? unpaidLeave : 0.0;

            return new SalaryDTO(employeeSalary, employeeName, lateMinutes, otTime, unpaidLeave);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }).filter(dto -> dto != null).collect(Collectors.toList());
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
