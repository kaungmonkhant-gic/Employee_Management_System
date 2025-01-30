package ems.com.ems_project.service;

import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    // Get salary details for an employee by employeeId
    public EmployeeSalary getEmployeeSalaryById(String employeeId) {
        Optional<EmployeeSalary> employeeSalary = employeeSalaryRepository.findById(employeeId);
        return employeeSalary.orElse(null);
    }

    // Add or Update salary details for an employee
    public EmployeeSalary saveOrUpdateSalary(EmployeeSalary employeeSalary) {
        return employeeSalaryRepository.save(employeeSalary);
    }

    // Delete salary details for an employee by employeeId
    public void deleteEmployeeSalary(String employeeId) {
        employeeSalaryRepository.deleteByEmployeeId(employeeId);
    }

    // Get salary details for all employees
    public List<EmployeeSalary> getAllEmployeeSalaries() {
        return employeeSalaryRepository.findAll();
    }
}
