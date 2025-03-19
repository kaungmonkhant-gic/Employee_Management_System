package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.dto.EmployeeSalaryDTO;
import ems.com.ems_project.dto.SalaryDTO;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<List<SalaryDTO>> getAllEmployeeSalaries() {
        List<SalaryDTO> salaryList = salaryService.getAllEmployeeSalaryDetails();
        return ResponseEntity.ok(salaryList);
    }

}

