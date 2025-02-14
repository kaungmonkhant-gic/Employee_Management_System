package ems.com.ems_project.service;

import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private DailyAttendanceRepository attendanceRepository;
    private EmployeeRepository employeeRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(attendance -> new AttendanceDTO
                        (attendance,attendance.getLeave(), attendance.getOvertime(),
                                attendance.getEmployee().getName()))
                .toList();
    }

    public void checkIn(String username, AttendanceDTO attendanceDTO) {
        Employee employee = employeeRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        EmpDailyAtts attendance = new EmpDailyAtts();
        attendance.setEmployee(employee);
        attendance.setDate(Date.valueOf(LocalDate.now()));
        attendance.setCheckInTime(LocalTime.now());
        attendanceRepository.save(attendance);
    }

}
