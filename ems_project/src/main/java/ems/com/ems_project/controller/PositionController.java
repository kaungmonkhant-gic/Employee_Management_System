package ems.com.ems_project.controller;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.Positions;
import ems.com.ems_project.service.DepartmentService;
import ems.com.ems_project.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @GetMapping("")
    public ResponseEntity<List<Positions>> getAllPositions() {
        return ResponseEntity.ok(positionService.getAllPositions());
    }
}