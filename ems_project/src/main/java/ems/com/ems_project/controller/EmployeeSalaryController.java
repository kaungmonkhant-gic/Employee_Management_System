package ems.com.ems_project.controller;

import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.service.EmployeeSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/salary")
public class EmployeeSalaryController {

    @Autowired
    private EmployeeSalaryService salaryService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeSalary> getSalaryByEmployeeId(@PathVariable String employeeId) {
        EmployeeSalary salary = salaryService.getSalaryByEmployeeId(employeeId);
        return salary != null ? ResponseEntity.ok(salary) : ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<EmployeeSalary> saveOrUpdateSalary(@RequestBody EmployeeSalary salary) {
        EmployeeSalary savedSalary = salaryService.saveOrUpdateSalary(salary);
        return ResponseEntity.ok(savedSalary);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeSalary>> getAllSalaries() {
        return ResponseEntity.ok(salaryService.getAllSalaries());
    }

}

