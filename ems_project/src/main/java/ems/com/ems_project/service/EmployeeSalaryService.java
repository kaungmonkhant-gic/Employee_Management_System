package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.model.EmployeeSalary;

import java.util.List;

public interface EmployeeSalaryService {
    List<EmployeeSalaryDTO> getAllSalaries();
}
