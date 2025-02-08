package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeRegisterDTO;
import ems.com.ems_project.service.EmployeeRegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/employees")
@Validated
public class EmployeeRegisterController {

    @Autowired
    private EmployeeRegistrationService employeeRegistrationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@Valid @RequestBody EmployeeRegisterDTO employeeRegisterDTO) {
        System.out.println( employeeRegisterDTO.toString());
        return employeeRegistrationService.registerEmployee(employeeRegisterDTO);
    }
}
