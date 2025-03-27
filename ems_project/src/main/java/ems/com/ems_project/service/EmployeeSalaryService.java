package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;

import java.util.List;

public interface EmployeeSalaryService {
    List<EmployeeSalaryDTO> getAllSalaries();
    List<SalaryDTO> getAllEmployeeSalaryDetails(int year, int month);

    //void createEmployeeSalary(Employee savedEmployee, RegisterDTO registerDTO);
}
