package ems.com.ems_project.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ems.com.ems_project.model.Leaves;
import ems.com.ems_project.service.LeavesService;

import java.util.List;

@RestController
@RequestMapping
public class LeavesController {
    @Autowired
    private LeavesService leaveService;

    @PostMapping("/add/leaves")
    public ResponseEntity<Leaves> createLeave(@RequestBody Leaves leave) {
        Leaves savedLeave = leaveService.saveLeave(leave);
        return ResponseEntity.ok(savedLeave);
    }

    @GetMapping("/all/leaves")
    public ResponseEntity<List<Leaves>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }
}

