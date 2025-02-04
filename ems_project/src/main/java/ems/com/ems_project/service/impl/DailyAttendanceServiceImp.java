package ems.com.ems_project.service.impl;

import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.service.DailyAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyAttendanceServiceImp implements DailyAttendanceService {

    @Autowired
    private DailyAttendanceRepository dailyAttendanceRepository;  // Inject the repository

    @Override
    public List<EmpDailyAtts> getAllAttendances() {
        return dailyAttendanceRepository.findAll();  // Assuming you have a repository method like findAll
    }
}
