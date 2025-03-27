package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.Ots;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    // Method to get all attendance records
    List<AttendanceDTO> getAttendanceRecordRoleBased(String token);
    ReqRes checkIn(String loggedInUsername);
    ReqRes checkOut(String loggedInUsername);

    String generateAttendanceId();
    List<AttendanceDTO> getAttendanceRecordsForLoggedInUser();
    void updateAttendanceForLeave(Employee employee, LocalDate startDate, LocalDate endDate, Leave leave);
    void updateOTForAttendance(Employee employee, LocalDate otDate, Ots ot);
}

