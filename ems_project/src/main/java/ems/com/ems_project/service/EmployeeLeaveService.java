package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.model.LeaveType;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private JWTUtils jwtutils;

    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveRepository.findAll().stream()
                .filter(employeeLeave -> employeeLeave.getEmployee().getResignDate() == null) // Exclude resigned employees
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

    public void updateLeaveBalance(EmployeeLeave employeeLeave, LeaveType leaveType, Double leaveDays) {
        switch (leaveType) {
            case ANNUAL:
                if (employeeLeave.getAnnualLeave() < leaveDays) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient annual leave balance.");
                }
                employeeLeave.setAnnualLeave(employeeLeave.getAnnualLeave() - leaveDays);
                break;
            case CASUAL:
                if (employeeLeave.getCasualLeave() < leaveDays) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient casual leave balance.");
                }
                employeeLeave.setCasualLeave(employeeLeave.getCasualLeave() - leaveDays);
                break;
            case MEDICAL:
                if (employeeLeave.getMedicalLeave() < leaveDays) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient medical leave balance.");
                }
                employeeLeave.setMedicalLeave(employeeLeave.getMedicalLeave() - leaveDays);
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid leave type.");
        }

        // Update the total leave balance
        employeeLeave.setTotal(employeeLeave.getAnnualLeave() + employeeLeave.getCasualLeave() + employeeLeave.getMedicalLeave());

        // Save updated leave balance
        employeeLeaveRepository.save(employeeLeave);
    }


    public void updateUnpaidLeaveBalance(Employee employee, LocalDate leaveDate) {
        // Fetch the EmployeeLeave record
        EmployeeLeave employeeLeave = employeeLeaveRepository.findByEmployeeId(employee.getId())
                .orElseThrow(() -> new RuntimeException("Employee leave record not found"));

        // Increment the unpaid leave balance
        employeeLeave.setUnpaidLeave(employeeLeave.getUnpaidLeave() + 1);

        // Update the total leave balance
        employeeLeave.setTotal(employeeLeave.getAnnualLeave() + employeeLeave.getCasualLeave() + employeeLeave.getMedicalLeave());

        // Save updated leave balance
        employeeLeaveRepository.save(employeeLeave);
    }

    public List<EmployeeLeaveDTO> getEmployeeLeaveRecordRoleBased(String token) {
        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the logged-in employee (who might be a manager)
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<EmployeeLeave> employeeLeaves = new ArrayList<>();

        if ("Admin".equals(roleName)) {
            // Admin: Get leave records of **only active employees**
            List<Employee> activeEmployees = employeeRepository.findAll()
                    .stream()
                    .filter(emp -> emp.getResignDate() == null) // Exclude resigned employees
                    .collect(Collectors.toList());

            // Fetch leave records for active employees
            for (Employee activeEmployee : activeEmployees) {
                Optional<EmployeeLeave> employeeLeave = employeeLeaveRepository.findByEmployeeId(activeEmployee.getId());
                employeeLeave.ifPresent(employeeLeaves::add);
            }
        } else if ("Manager".equals(roleName)) {
            // Manager: Fetch employees in the same department **who have NOT resigned**
            List<Employee> activeEmployees = employeeRepository.findByDepartment(employee.getDepartment())
                    .stream()
                    .filter(emp -> emp.getResignDate() == null) // Exclude resigned employees
                    .collect(Collectors.toList());

            // Fetch leave records for active employees
            for (Employee activeEmployee : activeEmployees) {
                Optional<EmployeeLeave> employeeLeave = employeeLeaveRepository.findByEmployeeId(activeEmployee.getId());
                employeeLeave.ifPresent(employeeLeaves::add);
            }
        } else {
            return Collections.emptyList(); // Other roles don't have access
        }

        // Convert to DTO and return
        return employeeLeaves.stream()
                .map(employeeLeave -> new EmployeeLeaveDTO(employeeLeave, employeeLeave.getEmployee().getName()))
                .collect(Collectors.toList());
    }


    public EmployeeLeave createEmployeeLeave(Employee employee) {

        EmployeeLeave employeeLeave = new EmployeeLeave();
        employeeLeave.setId(generateEmployeeLeaveId());
        employeeLeave.setEmployee(employee);
        employeeLeave.setAnnualLeave(10.0);
        employeeLeave.setCasualLeave(6.0);
        employeeLeave.setMedicalLeave(30.0);
        employeeLeave.setUnpaidLeave(0.0);
        employeeLeave.setTotal(10.0 + 6.0 + 30.0+0.0);

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
