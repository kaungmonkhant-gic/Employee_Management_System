package ems.com.ems_project.service;

import ems.com.ems_project.model.EmployeeSalary;

import java.util.List;
import java.util.Optional;

public interface EmployeeSalaryService {

    // Fetch salary details by employee ID
    Optional<EmployeeSalary> getSalaryByEmployeeId(String employeeId);

    // Save or update salary details
    EmployeeSalary saveOrUpdateSalary(EmployeeSalary employeeSalary);

    // Delete salary record by employee ID
    void deleteSalaryByEmployeeId(String employeeId);

    List<EmployeeSalary> getAllEmployeeSalaries();
}
