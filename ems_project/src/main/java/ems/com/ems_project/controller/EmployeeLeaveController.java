package ems.com.ems_project.controller;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.service.EmployeeLeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employeeleaves")
public class EmployeeLeaveController {

    @Autowired
    private EmployeeLeaveService employeeLeaveService;

    @GetMapping
    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveService.getAllLeavesWithEmployeeName();
    }
}
