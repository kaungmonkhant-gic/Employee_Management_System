package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.SalaryHistoryDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.SalaryHistory;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.SalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalaryHistoryService {

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private GenerateId generateId;



    public List<SalaryHistoryDTO> getSalaryRecordsForLoggedInUser() {
        // Find the logged-in employee using the authenticated email
        String loggedInUsername = getLoggedInUsername();
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Fetch only OT records related to the logged-in user
        List<SalaryHistory> salaryRecords = salaryHistoryRepository.findByEmployeeId(employee.getId());

        // Convert to DTO format
        return salaryRecords.stream()
                .map(salaryhistory -> new SalaryHistoryDTO(salaryhistory, salaryhistory.getEmployee()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }



    // Helper method to get logged-in username (email) from JWT
    private String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    @Transactional
    public List<SalaryHistoryDTO> saveSalaries(List<SalaryHistoryDTO> salaryDTOList) {
        List<SalaryHistory> salaryRecords = new ArrayList<>();

        // Fetch last SalaryHistory ID once
        Optional<String> lastIdOptional = salaryHistoryRepository.findLastSalaryHistoryId();
        String lastId = generateSalaryHistoryId(lastIdOptional);

        System.out.println("Starting SalaryHistory ID: " + lastId);
        System.out.println("Total records to process: " + salaryDTOList.size());

        for (SalaryHistoryDTO dto : salaryDTOList) {
            // Fetch employee by ID
            Employee employee = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + dto.getEmployeeId()));

            // Check if salary record already exists
            Optional<SalaryHistory> existingSalary = salaryHistoryRepository
                    .findByEmployeeIdAndSalaryMonth(dto.getEmployeeId(), dto.getSalaryMonth());

            if (existingSalary.isPresent()) {
                System.out.println("Salary record already exists for Employee ID: " + dto.getEmployeeId() + " and Salary Month: " + dto.getSalaryMonth());
                throw new RuntimeException("Salary record already exists for Employee ID: " + dto.getEmployeeId() + " and Salary Month: " + dto.getSalaryMonth());
            }

            // Generate a new unique SalaryHistory ID
            lastId = generateSalaryHistoryId(Optional.of(lastId));
            System.out.println("Generated SalaryHistory ID: " + lastId);

            // Create new SalaryHistory entity
            SalaryHistory salaryHistory = new SalaryHistory();
            salaryHistory.setId(lastId);
            salaryHistory.setEmployee(employee);
            salaryHistory.setSalaryMonth(dto.getSalaryMonth());
            salaryHistory.setBasicSalary(dto.getBasicSalary());
            salaryHistory.setBonus(dto.getBonus());
            salaryHistory.setFinalSalary(dto.getFinalSalary());
            salaryHistory.setHouseAllowance(dto.getHouseAllowance());
            salaryHistory.setLateOverFee(dto.getLateOverFee());
            salaryHistory.setLeaveOverFee(dto.getLeaveOverFee());
            salaryHistory.setManualAdjustment(dto.getManualAdjustment());
            salaryHistory.setOtFee(dto.getOtFee());
            salaryHistory.setTransportation(dto.getTransportation());

            salaryRecords.add(salaryHistory);
        }

        System.out.println("Total records to save in SalaryHistory: " + salaryRecords.size());

        try {
            salaryHistoryRepository.saveAll(salaryRecords);
            System.out.println("Records saved successfully. Number of records: " + salaryRecords.size());
        } catch (Exception e) {
            System.out.println("Error during save operation: " + e.getMessage());
            throw new RuntimeException("Error saving SalaryHistory records.", e);
        }

        // Convert saved SalaryHistory records to SalaryHistoryDTO
        List<SalaryHistoryDTO> savedSalaryDTOs = new ArrayList<>();
        for (SalaryHistory salaryHistory : salaryRecords) {
            savedSalaryDTOs.add(new SalaryHistoryDTO(salaryHistory, salaryHistory.getEmployee()));
        }

        return savedSalaryDTOs;
    }


    // Generate SalaryHistory ID
    private String generateSalaryHistoryId(Optional<String> lastIdOptional) {
        String lastId = lastIdOptional.orElse("SALHIS000"); // Default if no ID exists
        String prefix = "SALHIS";
        return generateId.generateId(lastId, prefix);
    }
}

