package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.model.EmpDailyAtts;
import java.util.List;

public interface DailyAttendanceService {

    // Method to get all attendance records
    List<EmpDailyAtts> getAllAttendances();

}

