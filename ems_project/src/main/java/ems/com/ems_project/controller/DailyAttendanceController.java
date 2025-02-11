package ems.com.ems_project.controller;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}