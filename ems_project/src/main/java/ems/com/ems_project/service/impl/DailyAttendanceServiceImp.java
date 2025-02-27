package ems.com.ems_project.service.impl;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.service.AttendanceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyAttendanceServiceImp implements AttendanceService {


    @Autowired
    private DailyAttendanceRepository attendanceRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private GenerateId generateId;

    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(attendance -> new AttendanceDTO
                        (attendance,attendance.getLeave(), attendance.getOvertime(),
                                attendance.getEmployee().getName()))
                .toList();
    }
    public List<AttendanceDTO> getAttendanceByEmployeeId(String employeeId) {
        // Check if the employee exists
        if (!employeeRepository.existsById(employeeId)) {
            throw new RuntimeException("Employee not found");
        }

        // Get all attendance records for this employee
        List<EmpDailyAtts> attendanceList = attendanceRepository.findByEmployeeId(employeeId);

        // Convert each attendance record into an AttendanceDTO
        return attendanceList.stream()
                .map(attendance -> new AttendanceDTO(attendance, attendance.getLeave(), attendance.getOvertime(),
                        attendance.getEmployee().getName()))
                .collect(Collectors.toList());
    }


    public String generateAttendanceId() {
        // Get the last Attendance ID from the database
        Optional<String> lastIdOptional = attendanceRepository.findLastAttendanceId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "ATT";

        // Generate the new Attendance ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }

    @Override
    public AttendanceDTO checkIn(String loggedInUsername) {
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Date todayDate = Date.valueOf(LocalDate.now());
        LocalTime checkInTime = LocalTime.now();

        // Check if attendance already exists for today
        EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
        if (existingAttendance != null) {
            throw new RuntimeException("Attendance already recorded for today.");
        }

        EmpDailyAtts attendance = new EmpDailyAtts();
        attendance.setId(generateAttendanceId());
        attendance.setEmployee(employee);
        attendance.setDate(todayDate);
        attendance.setCheckInTime(checkInTime);

        attendanceRepository.save(attendance);

        // Map entity to DTO and return
        return modelMapper.map(attendance, AttendanceDTO.class);
    }

    @Override
    public AttendanceDTO checkOut(String loggedInUsername) {
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Date todayDate = new Date(System.currentTimeMillis());  // Get current date
        LocalTime checkOutTime = LocalTime.now(); // Current time

        // Directly check for null instead of using Optional
        EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
        if (existingAttendance == null) {
            throw new RuntimeException("No check-in found for today.");
        }

        // If already checked out, throw an exception
        if (existingAttendance.getCheckOutTime() != null) {
            throw new RuntimeException("Already checked out.");
        }

        existingAttendance.setCheckOutTime(checkOutTime);
        attendanceRepository.save(existingAttendance);

        AttendanceDTO attendanceDTO = modelMapper.map(existingAttendance, AttendanceDTO.class);
        attendanceDTO.setEmployeeName(employee.getName());

        return attendanceDTO;
    }

}
