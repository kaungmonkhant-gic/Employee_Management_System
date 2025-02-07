package ems.com.ems_project.controller;

import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.service.EmployeeLeaveService;
import ems.com.ems_project.service.EmployeeLeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave")
public class EmployeeLeaveController {

    @Autowired
    private EmployeeLeaveService leaveService;

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeLeave> getLeaveByEmployeeId(@PathVariable String employeeId) {
        EmployeeLeave leave = leaveService.getLeaveByEmployeeId(employeeId);
        return leave != null ? ResponseEntity.ok(leave) : ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<EmployeeLeave> saveOrUpdateLeave(@RequestBody EmployeeLeave leave) {
        EmployeeLeave savedLeave = leaveService.saveOrUpdateLeave(leave);
        return ResponseEntity.ok(savedLeave);
    }

    @GetMapping("")
    public ResponseEntity<List<EmployeeLeave>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }
}
