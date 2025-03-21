package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.TempSalaryHistory;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.TempSalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class TempSalaryHistoryService {


    @Autowired
    TempSalaryHistoryRepository tempSalaryHistoryRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private GenerateId generateId;

    public List<SalaryDTO> saveSalaries(List<SalaryDTO> salaryDTOList) {
        List<TempSalaryHistory> tempSalaries = new ArrayList<>();

        // Fetch the last TempSalary ID from the database ONCE
        Optional<String> lastIdOptional = tempSalaryHistoryRepository.findLastTempSalaryId();
        String lastId = generateTempSalaryId(lastIdOptional);

        // Debugging
        System.out.println("Starting TempSalary ID: " + lastId);
        System.out.println("Total records to process: " + salaryDTOList.size());

        for (SalaryDTO dto : salaryDTOList) {
            // Fetch the employee using employeeId
            Employee employee = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + dto.getEmployeeId()));

            // Check if salary record already exists
            Optional<TempSalaryHistory> existingSalary = tempSalaryHistoryRepository
                    .findByEmployeeIdAndSalaryMonth(dto.getEmployeeId(), dto.getSalaryMonth());

            if (existingSalary.isPresent()) {
                System.out.println("Salary record already exists for Employee ID: " + dto.getEmployeeId() + " and Salary Month: " + dto.getSalaryMonth());
                throw new RuntimeException("Salary record already exists for Employee ID: " + dto.getEmployeeId() + " and Salary Month: " + dto.getSalaryMonth());
            }

            // Generate a new unique TempSalary ID for each record
            lastId = generateTempSalaryId(Optional.of(lastId));
            System.out.println("Generated TempSalary ID: " + lastId);

            // Create new TempSalaryHistory entity
            TempSalaryHistory tempSalary = new TempSalaryHistory();
            tempSalary.setId(lastId);
            tempSalary.setEmployee(employee);
            tempSalary.setSalaryMonth(dto.getSalaryMonth());
            tempSalary.setBasicSalary(dto.getBasicSalary());
            tempSalary.setBonus(dto.getBonus());
            tempSalary.setFinalSalary(dto.getFinalSalary());
            tempSalary.setHouseAllowance(dto.getHouseAllowance());
            tempSalary.setLateOverFee(dto.getLateOverFee());
            tempSalary.setLeaveOverFee(dto.getLeaveOverFee());
            tempSalary.setManualAdjustment(dto.getManualAdjustment());
            tempSalary.setOtFee(dto.getOtFee());
            tempSalary.setTransportation(dto.getTransportation());

            tempSalaries.add(tempSalary);
        }

        // Debugging
        System.out.println("Total records to save in TempSalaryHistory: " + tempSalaries.size());

        try {
            tempSalaryHistoryRepository.saveAll(tempSalaries);
            System.out.println("Records saved successfully. Number of records: " + tempSalaries.size());
        } catch (Exception e) {
            System.out.println("Error during save operation: " + e.getMessage());
            throw new RuntimeException("Error saving TempSalaryHistory records.", e);
        }

        // Convert saved TempSalaryHistory records to SalaryDTO list
        List<SalaryDTO> savedSalaryDTOs = new ArrayList<>();
        for (TempSalaryHistory tempSalary : tempSalaries) {
            savedSalaryDTOs.add(new SalaryDTO(tempSalary));
        }

        return savedSalaryDTOs;
    }
    public String generateTempSalaryId(Optional<String> lastIdOptional) {
        String lastId = lastIdOptional.orElse("TEMPSAL000"); // Default if no ID exists
        System.out.println("Last TempSalary ID: " + lastId);

        String prefix = "TEMPSAL";
        return generateId.generateId(lastId, prefix);
    }
}
