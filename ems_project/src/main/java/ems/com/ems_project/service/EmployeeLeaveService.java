package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveRepository.findAll().stream()
                .map(employeeLeave -> new EmployeeLeaveDTO(employeeLeave, employeeLeave.getEmployee().getName()))
                .toList();
    }

    public EmployeeLeaveDTO getEmployeeLeaveByEmployeeId(String loggedInUsername) {
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));
        EmployeeLeave employeeLeave = employeeLeaveRepository.findByEmployeeId(employee.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee leave not found"));

        String employeeName = employeeLeave.getEmployee().getName();

        return new EmployeeLeaveDTO(employeeLeave, employeeName);
    }

//    public void createEmployeeLeave(Employee savedEmployee, RegisterDTO registerDTO) {
//        EmployeeLeave employeeLeave = new EmployeeLeave();
//
//        // Generate and assign ID before saving
//        employeeLeave.setId(generateEmployeeLeaveId());
//        employeeLeave.setEmployee(savedEmployee);
//        employeeLeave.setAnnualLeave(registerDTO.getAnnualLeave());
//        employeeLeave.setCasualLeave(registerDTO.getCasualLeave());
//        employeeLeave.setMedicalLeave(registerDTO.getMedicalLeave());
//
//        // Calculate total leave
//        double totalLeave = registerDTO.getAnnualLeave()
//                + registerDTO.getCasualLeave()
//                + registerDTO.getMedicalLeave();
//        employeeLeave.setTotal(totalLeave);
//
//        employeeLeaveRepository.save(employeeLeave);
//    }

    public EmployeeLeave createEmployeeLeave(Employee employee) {

        EmployeeLeave employeeLeave = new EmployeeLeave();
        employeeLeave.setId(generateEmployeeLeaveId());
        employeeLeave.setEmployee(employee);
        employeeLeave.setAnnualLeave(10.0);
        employeeLeave.setCasualLeave(6.0);
        employeeLeave.setMedicalLeave(30.0);
        employeeLeave.setTotal(10.0 + 6.0 + 30.0);

        return employeeLeaveRepository.save(employeeLeave);
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
}
