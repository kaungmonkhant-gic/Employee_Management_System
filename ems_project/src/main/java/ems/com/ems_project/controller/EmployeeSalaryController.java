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
    private EmployeeSalaryService employeeSalaryService;

    // Get salary details for an employee by employeeId
    @GetMapping("/{employeeId}")
    public ResponseEntity<Optional<EmployeeSalary>> getSalaryByEmployeeId(@PathVariable String employeeId) {
        Optional<EmployeeSalary> employeeSalary = employeeSalaryService.getSalaryByEmployeeId(employeeId);

        if (employeeSalary != null) {
            return new ResponseEntity<>(employeeSalary, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    // Add or Update salary details for an employee
    @PostMapping("/save")
    public ResponseEntity<EmployeeSalary> saveOrUpdateSalary(@RequestBody EmployeeSalary employeeSalary) {
        EmployeeSalary savedSalary = employeeSalaryService.saveOrUpdateSalary(employeeSalary);
        return new ResponseEntity<>(savedSalary, HttpStatus.CREATED);
    }

    // Delete salary details for an employee
    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Void> deleteSalary(@PathVariable String employeeId) {
        employeeSalaryService.deleteSalaryByEmployeeId(employeeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // Get salary details for all employees
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeSalary>> getAllSalaries() {
        List<EmployeeSalary> allSalaries = employeeSalaryService.getAllEmployeeSalaries();
        return new ResponseEntity<>(allSalaries, HttpStatus.OK);
    }

}

