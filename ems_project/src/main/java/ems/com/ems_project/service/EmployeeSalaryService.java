package ems.com.ems_project.service;

import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.EmployeeSalary;

import java.util.List;

public interface EmployeeSalaryService {
    EmployeeSalary getSalaryByEmployeeId(String employeeId);
    EmployeeSalary saveOrUpdateSalary(EmployeeSalary salary);
    List<EmployeeSalary> getAllSalaries();
}
