package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private GenerateId generateId;

    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveRepository.findAll().stream()
                .map(employeeLeave -> new EmployeeLeaveDTO(employeeLeave, employeeLeave.getEmployee().getName()))
                .toList();
    }

    // In EmployeeLeaveService.java
    public EmployeeLeaveDTO getEmployeeLeaveById(String employeeId) {
        EmployeeLeave employeeLeave = employeeLeaveRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Leave details not found for employee ID: " + employeeId));

        return new EmployeeLeaveDTO(employeeLeave, employeeLeave.getEmployee().getName());
    }



    public String generateEmployeeLeaveId() {
        // Get the last Leave ID from the database
        Optional<String> lastLeaveIdOptional = employeeLeaveRepository.findLastLeaveId();

        String lastLeaveId = lastLeaveIdOptional.orElse(null); // If no ID exists, use null

        // Define the prefix for the Leave ID
        String prefix = "EMPLEA"; // You can adjust this prefix as needed

        // Generate the new Leave ID using the GenerateId class and the prefix
        return generateId.generateId(lastLeaveId, prefix);
    }

    public void createEmployeeLeave(Employee savedEmployee, RegisterDTO registerDTO) {
        EmployeeLeave employeeLeave = new EmployeeLeave();

        // Generate and assign ID before saving
        employeeLeave.setId(generateEmployeeLeaveId());
        employeeLeave.setEmployee(savedEmployee);
        employeeLeave.setAnnualLeave(registerDTO.getAnnualLeave());
        employeeLeave.setCasualLeave(registerDTO.getCasualLeave());
        employeeLeave.setMedicalLeave(registerDTO.getMedicalLeave());

        // Calculate total leave
        double totalLeave = registerDTO.getAnnualLeave()
                + registerDTO.getCasualLeave()
                + registerDTO.getMedicalLeave();
        employeeLeave.setTotal(totalLeave);

        employeeLeaveRepository.save(employeeLeave);
    }
}
