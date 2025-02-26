package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;

import java.util.List;

public interface AttendanceService {

    // Method to get all attendance records
    List<AttendanceDTO> getAllAttendance();
    List<AttendanceDTO> getAttendanceByEmployeeId(String employeeId);
    AttendanceDTO checkIn(String loggedInUsername);
    AttendanceDTO checkOut(String loggedInUsername);

    String generateAttendanceId();
}

