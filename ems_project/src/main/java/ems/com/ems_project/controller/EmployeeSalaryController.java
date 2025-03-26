package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.model.TempSalaryHistory;
import ems.com.ems_project.service.EmployeeSalaryService;
import ems.com.ems_project.service.TempSalaryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/salary")
public class EmployeeSalaryController {

    @Autowired
    private EmployeeSalaryService salaryService;
    @Autowired
    private TempSalaryHistoryService tempSalaryHistoryService;

    @GetMapping("/all")
    public List<EmployeeSalaryDTO> getAllSalaries() {
        return salaryService.getAllSalaries();
    }

    @GetMapping("/data")
    public ResponseEntity<List<SalaryDTO>> getEmployeeSalaryDetails(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        try {
            // Call the service method to get salary details for the given month and year
            List<SalaryDTO> salaryList = salaryService.getAllEmployeeSalaryDetails(year, month);

            // Return the salary list with HTTP status OK (200)
            return ResponseEntity.ok(salaryList);
        } catch (Exception e) {
            // Handle any exceptions, log the error, and return internal server error (500)
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<List<SalaryDTO>> saveSalaries(@RequestBody List<SalaryDTO> salaryDTOList) {
        try {

            List<SalaryDTO> savedSalaries = tempSalaryHistoryService.saveSalaries(salaryDTOList);
            return ResponseEntity.ok(savedSalaries);
        } catch (Exception e) {
            System.out.println("Error during salary save: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

