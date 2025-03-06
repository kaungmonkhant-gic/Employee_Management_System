package ems.com.ems_project.service.impl;

import java.util.List;
import java.util.Optional;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.repository.EmployeeSalaryRepository;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.Position;

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

    public EmployeeSalaryDTO getEmployeeSalaryById(String employeeId) {
        EmployeeSalary employeeSalary = salaryRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Salary details not found for employee ID: " + employeeId));

        return new EmployeeSalaryDTO(employeeSalary, employeeSalary.getEmployee().getName());
    }


//    public void createEmployeeSalary(Employee savedEmployee, RegisterDTO registerDTO) {
//        EmployeeSalary employeeSalary = new EmployeeSalary();
//        employeeSalary.setId(generateEmployeeSalaryId()); // Generate and set ID
//        employeeSalary.setEmployee(savedEmployee);
//        employeeSalary.setBasicSalary(registerDTO.getBasicSalary());
//        employeeSalary.setHouseAllowance(registerDTO.getHouseAllowance());
//        employeeSalary.setTransportation(registerDTO.getTransportation());
//
//        salaryRepository.save(employeeSalary);
//    }

    public EmployeeSalary createEmployeeSalary(Employee employee) {
        // Fetch salary details based on position
        EmployeeSalary positionSalary = salaryRepository.findByPositionId(employee.getPositionId());
        System.out.println("Fetching salary details for position ID: " + employee.getPositionId());

        if (positionSalary == null) {
            throw new RuntimeException("Salary details not found for position: " + employee.getPosition().getPositionName());
        }

        // Create new salary entry for the employee
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.setId(generateEmployeeSalaryId()); // Generate unique ID
        employeeSalary.setEmployee(employee);
        employeeSalary.setPositions(employee.getPosition()); // Assign position
        employeeSalary.setBasicSalary(positionSalary.getBasicSalary());
        employeeSalary.setHouseAllowance(positionSalary.getHouseAllowance());
        employeeSalary.setTransportation(positionSalary.getTransportation());

        return salaryRepository.save(employeeSalary);
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
