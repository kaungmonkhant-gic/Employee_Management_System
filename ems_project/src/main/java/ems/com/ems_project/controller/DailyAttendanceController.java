package ems.com.ems_project.controller;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class DailyAttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("")
    public List<AttendanceDTO> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
    @PostMapping("/checkin")
    public ResponseEntity<String> checkIn(@RequestBody AttendanceDTO attendanceDTO, Principal principal) {
        String username; // Get logged-in user
        username = principal.getName();
        attendanceService.checkIn(username, attendanceDTO);
        return ResponseEntity.ok("Checked in successfully");
    }

}