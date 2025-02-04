package ems.com.ems_project.service.impl;

import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    @Override
    public Optional<EmployeeSalary> getSalaryByEmployeeId(String employeeId) {
        return employeeSalaryRepository.findByEmployeeId(employeeId);
    }

    @Override
    public EmployeeSalary saveOrUpdateSalary(EmployeeSalary employeeSalary) {
        return employeeSalaryRepository.save(employeeSalary);
    }

    @Override
    public void deleteSalaryByEmployeeId(String employeeId) {
        employeeSalaryRepository.deleteByEmployeeId(employeeId);
    }

    @Override
    public List<EmployeeSalary> getAllEmployeeSalaries() {
        return employeeSalaryRepository.findAll();
    }
}

