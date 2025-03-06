package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeSalary;

import java.util.List;

public interface EmployeeSalaryService {
    List<EmployeeSalaryDTO> getAllSalaries();
    EmployeeSalaryDTO getEmployeeSalaryById(String employeeId);
    String generateEmployeeSalaryId();
    EmployeeSalary createEmployeeSalary(Employee employee);


    //void createEmployeeSalary(Employee savedEmployee, RegisterDTO registerDTO);
}
