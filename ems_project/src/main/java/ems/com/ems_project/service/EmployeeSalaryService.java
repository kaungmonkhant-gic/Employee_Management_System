package ems.com.ems_project.service;

import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    // Get salary details for an employee by employeeId
    public EmployeeSalary getEmployeeSalaryById(Integer employeeId) {
        Optional<EmployeeSalary> employeeSalary = employeeSalaryRepository.findById(employeeId);
        return employeeSalary.orElse(null);
    }

    // Add or Update salary details for an employee
    public EmployeeSalary saveOrUpdateSalary(EmployeeSalary employeeSalary) {
        return employeeSalaryRepository.save(employeeSalary);
    }

    // Delete salary details for an employee by employeeId
    public void deleteEmployeeSalary(Integer employeeId) {
        employeeSalaryRepository.deleteByEmployeeId(employeeId);
    }
}
