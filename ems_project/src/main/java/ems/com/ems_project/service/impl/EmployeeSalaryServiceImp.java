package ems.com.ems_project.service.impl;

import java.util.List;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository salaryRepository;

    public List<EmployeeSalaryDTO> getAllSalaries() {
        return salaryRepository.findAll().stream()
                .map(employeeSalary -> new EmployeeSalaryDTO(employeeSalary, employeeSalary.getEmployee().getName()))
                .toList();
    }
}
