package ems.com.ems_project.controller;

import ems.com.ems_project.dto.OtDTO;
import ems.com.ems_project.service.OtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ot")
public class OtController {

    @Autowired
    private OtService otService;

    // Get all OT records with employee and manager names
    @GetMapping("/all")
    public List<OtDTO> getAllOt() {
        return otService.getAllOt();
    }

    // Generate a new OT ID
    @GetMapping("/generate-id")
    public String generateOtId() {
        return otService.generateOtId();
    }
}
