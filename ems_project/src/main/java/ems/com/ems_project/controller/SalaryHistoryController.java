package ems.com.ems_project.controller;
import ems.com.ems_project.dto.SalaryHistoryDTO;
import ems.com.ems_project.service.SalaryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
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
}

