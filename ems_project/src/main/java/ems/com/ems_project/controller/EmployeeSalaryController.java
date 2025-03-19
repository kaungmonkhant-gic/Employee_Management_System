package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/all")
    public List<EmployeeSalaryDTO> getAllSalaries() {
        return salaryService.getAllSalaries();
    }

    //    @GetMapping
//    public ResponseEntity<List<SalaryDTO>> getAllEmployeeSalaries() {
//        List<SalaryDTO> salaryList = salaryService.getAllEmployeeSalaryDetails();
//        return ResponseEntity.ok(salaryList);
//    }
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
}

