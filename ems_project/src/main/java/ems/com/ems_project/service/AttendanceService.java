package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.dto.ReqRes;

import java.util.List;

public interface AttendanceService {
    // Method to get all attendance records
    List<AttendanceDTO> getAttendanceRecordRoleBased(String token);
    ReqRes checkIn(String loggedInUsername);
    ReqRes checkOut(String loggedInUsername);

    String generateAttendanceId();
    List<AttendanceDTO> getAttendanceRecordsForLoggedInUser();
}

