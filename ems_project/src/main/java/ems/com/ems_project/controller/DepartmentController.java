package ems.com.ems_project.controller;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.EmployeeSalary;
import ems.com.ems_project.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping("")
    public ResponseEntity<List<Departments>> getAllSalaries() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }
}
