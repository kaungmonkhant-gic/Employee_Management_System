package ems.com.ems_project.service.impl;

import java.util.List;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository salaryRepository;

    @Override
    public EmployeeSalary getSalaryByEmployeeId(String employeeId) {
        Optional<EmployeeSalary> salary = salaryRepository.findByEmployeeId(employeeId);
        return salary.orElse(null);
    }

    @Override
    public EmployeeSalary saveOrUpdateSalary(EmployeeSalary salary) {
        return salaryRepository.save(salary);
    }

    @Override
    public List<EmployeeSalary> getAllSalaries() {
        return salaryRepository.findAll();
    }
}
