package ems.com.ems_project.service.impl;

import java.util.List;
import java.util.Optional;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSalaryServiceImp implements EmployeeSalaryService {

    @Autowired
    private EmployeeSalaryRepository salaryRepository;
    @Autowired
    private GenerateId generateId;
    @Override
    public List<EmployeeSalaryDTO> getAllSalaries() {
        return salaryRepository.findAll().stream()
                .map(employeeSalary -> new EmployeeSalaryDTO(employeeSalary, employeeSalary.getEmployee().getName()))
                .toList();
    }

    public void createEmployeeSalary(Employee savedEmployee, RegisterDTO registerDTO) {
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.setId(generateEmployeeSalaryId()); // Generate and set ID
        employeeSalary.setEmployee(savedEmployee);
        employeeSalary.setBasicSalary(registerDTO.getBasicSalary());
        employeeSalary.setHouseAllowance(registerDTO.getHouseAllowance());
        employeeSalary.setTransportation(registerDTO.getTransportation());

        salaryRepository.save(employeeSalary);
    }
    @Override
    public String generateEmployeeSalaryId() {
        // Get the last Employee Salary ID from the correct repository
        Optional<String> lastSalaryIdOptional = salaryRepository.findLastEmployeeSalaryId();

        String lastSalaryId = lastSalaryIdOptional.orElse(null); // If no ID exists, use null

        // Define the correct prefix for Employee Salary ID
        String prefix = "SAL"; // Example: SAL001, SAL002, etc.

        // Generate the new Employee Salary ID using the GenerateId class
        return generateId.generateId(lastSalaryId, prefix);
    }

}
