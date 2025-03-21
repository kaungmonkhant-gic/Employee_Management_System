package ems.com.ems_project.controller;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.dto.SalaryHistoryDTO;
import ems.com.ems_project.service.SalaryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salary-history")
public class SalaryHistoryController {

    @Autowired
    private SalaryHistoryService salaryHistoryService;

    @GetMapping("/self")
    public ResponseEntity<List<SalaryHistoryDTO>> getLoggedInUserSalaryRecords() {
        return ResponseEntity.ok(salaryHistoryService.getSalaryRecordsForLoggedInUser());
    }
    @PostMapping("/save")
    public ResponseEntity<List<SalaryHistoryDTO>> saveSalaries(@RequestBody List<SalaryHistoryDTO> salaryRecord) {
        try {

            List<SalaryHistoryDTO>savedSalaries = salaryHistoryService.saveSalaries(salaryRecord);
            return ResponseEntity.ok(savedSalaries);
        } catch (Exception e) {
            System.out.println("Error during salary save: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

