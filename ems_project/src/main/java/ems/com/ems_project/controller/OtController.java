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
    @GetMapping("/{employeeId}")
    public ResponseEntity<List<OtDTO>> getOTByEmployeeId(@PathVariable String employeeId) {
        List<OtDTO> otDTO = otService.getOTByEmployeeId(employeeId);
        return ResponseEntity.ok(otDTO);
    }

    // Generate a new OT ID
    @GetMapping("/generate-id")
    public String generateOtId() {
        return otService.generateOtId();
    }
    @PutMapping("/approve/{otId}")
    public ResponseEntity<OtDTO> approveOTRequest(@PathVariable String otId) {
        OtDTO updatedOtDTO = otService.approveOTRequest(otId);
        return ResponseEntity.ok(updatedOtDTO);
    }

    // Endpoint to reject an OT request
    @PutMapping("/reject/{otId}")
    public ResponseEntity<OtDTO> rejectOTRequest(@PathVariable String otId) {
        OtDTO updatedOtDTO = otService.rejectOTRequest(otId);
        return ResponseEntity.ok(updatedOtDTO);
    }
}
