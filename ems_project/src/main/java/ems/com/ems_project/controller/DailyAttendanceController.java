package ems.com.ems_project.controller;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.service.AttendanceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class DailyAttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/all")
    public List<AttendanceDTO> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
    @PostMapping("/checkin")
    public AttendanceDTO checkIn(HttpServletRequest request) {
        String loggedInUsername = request.getUserPrincipal().getName();
        return attendanceService.checkIn(loggedInUsername);
    }

    @PostMapping("/checkout")
    public AttendanceDTO checkOut(HttpServletRequest request) {
        String loggedInUsername = request.getUserPrincipal().getName();
        return attendanceService.checkOut(loggedInUsername);
    }
    @GetMapping("/generate-id")
    public String generateAttendanceId() {
        return attendanceService.generateAttendanceId();
    }

}