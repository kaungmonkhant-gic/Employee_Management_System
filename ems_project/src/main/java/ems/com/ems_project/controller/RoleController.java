package ems.com.ems_project.controller;

import ems.com.ems_project.model.Roles;
import ems.com.ems_project.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<List<Roles>> getAllRoles(){
        return ResponseEntity.ok(roleService.getAllRoles());
    }
}
