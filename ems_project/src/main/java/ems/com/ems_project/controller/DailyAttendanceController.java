package ems.com.ems_project.controller;

import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.service.DailyAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attendance")
public class DailyAttendanceController {

    @Autowired
    private DailyAttendanceService dailyAttendanceService;


    // Get all attendance records
    @GetMapping("/all")
    public ResponseEntity<List<EmpDailyAtts>> getAllAttendances() {
        List<EmpDailyAtts> attendanceList = dailyAttendanceService.getAllAttendances();
        return new ResponseEntity<>(attendanceList, HttpStatus.OK);
    }

}
