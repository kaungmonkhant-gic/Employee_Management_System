package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private DailyAttendanceRepository attendanceRepository;

    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(attendance -> new AttendanceDTO
                        (attendance,attendance.getLeave(), attendance.getOvertime(),
                                attendance.getEmployee().getName()))
                .toList();
    }
}
