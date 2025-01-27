package ems.com.ems_project.service;

import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DailyAttendanceService {

    @Autowired
    private DailyAttendanceRepository dailyAttendanceRepository;


    // Get all attendance records
    public List<EmpDailyAtts> getAllAttendances() {
        return dailyAttendanceRepository.findAll();
    }

}
