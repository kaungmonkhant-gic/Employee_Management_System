package ems.com.ems_project.service.impl;
import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.AttendanceStatus;
import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.LeaveRepository;
import ems.com.ems_project.repository.OtRepository;
import ems.com.ems_project.service.AttendanceService;
import ems.com.ems_project.service.DateService;
import ems.com.ems_project.service.EmployeeService;
import ems.com.ems_project.service.JWTUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
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
    private LeaveRepository leaveRepository;
    @Autowired
    private OtRepository otRepository;
    @Autowired
    private JWTUtils jwtutils;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DateService dateService;

    public List<AttendanceDTO> getAttendanceRecordRoleBased(String token) {

        // Get active employees based on role
        List<EmployeeDTO> activeEmployees = employeeService.getActiveEmployeesBasedOnRole(token);

        // Extract active employee IDs
        List<String> activeEmployeeIds = activeEmployees.stream()
                .map(EmployeeDTO::getId)
                .collect(Collectors.toList());

        List<EmpDailyAtts> attendanceRecords = new ArrayList<>();

        // Extract user details from the token
        String email = jwtutils.extractUsername(token);
        String roleName = jwtutils.extractRole(token);

        // Get the logged-in employee details
        Employee manager = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Logging for debugging
        System.out.println("Logged-in Manager: " + manager.getName());
        System.out.println("Role: " + roleName);

        if ("Admin".equals(roleName)) {
            // Admin: Get all attendance records for active employees
            attendanceRecords = attendanceRepository.findAll().stream()
                    .filter(attendance -> activeEmployeeIds.contains(attendance.getEmployee().getId()))
                    .collect(Collectors.toList());
            System.out.println("Admin access: Attendance records fetched for active employees");

        } else if ("Manager".equals(roleName)) {
            // Manager: Get attendance records for active employees managed by the logged-in manager
            attendanceRecords = attendanceRepository.findByManagerId(manager.getId()).stream()
                    .filter(attendance -> activeEmployeeIds.contains(attendance.getEmployee().getId()))
                    .collect(Collectors.toList());
            System.out.println("Manager access: Attendance records fetched for employees managed by the manager");

        } else {
            return Collections.emptyList(); // Other roles don't have access
        }

        // Logging attendance records before converting to DTO
        System.out.println("Attendance records fetched: " + attendanceRecords.size() + " records found");

        // Convert to DTO and return
        return attendanceRecords.stream()
                .map(attendance -> {
                    // Check if checkInTime and checkOutTime are null and handle accordingly
                    LocalTime checkInTime = attendance.getCheckInTime() != null ? attendance.getCheckInTime() : null;
                    LocalTime checkOutTime = attendance.getCheckOutTime() != null ? attendance.getCheckOutTime() : null;

                    // Logging for debugging
                    System.out.println("Attendance record - CheckInTime: " + checkInTime + ", CheckOutTime: " + checkOutTime);

                    // Return DTO with null handling for checkInTime and checkOutTime
                    return new AttendanceDTO(attendance, attendance.getEmployee(), attendance.getManager());
                })
                .collect(Collectors.toList());
    }


    public List<AttendanceDTO> getAttendanceRecordsForLoggedInUser() {
        // Find the logged-in employee using the authenticated email
        String loggedInUsername = getLoggedInUsername();
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Fetch only OT records related to the logged-in user
        List<EmpDailyAtts> attendanceRecord = attendanceRepository.findByEmployeeId(employee.getId());

        // Convert to DTO format
        return attendanceRecord.stream()
                .map(attendance -> new AttendanceDTO(attendance, attendance.getEmployee(), attendance.getManager()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }

    @Override
    public ReqRes checkIn(String loggedInUsername) {
        ReqRes response = new ReqRes();

        try {
            Employee employee = employeeRepository.findByEmail(loggedInUsername)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            LocalDate todayDate = LocalDate.now();
            LocalTime checkInTime = LocalTime.now();

            // Check if attendance already exists for today
            EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
            if (existingAttendance != null) {
                response.setStatusCode(400);
                response.setError("Attendance already recorded for today.");
                return response;  // Return structured error response
            }
            // Define the acceptable check-in time range (8 AM to 5 PM)
            LocalTime startOfWorkDay = LocalTime.of(8, 0); // 8:00 AM

            AttendanceStatus status;
            Integer lateMin = 0; // Default late minutes

            // Check if the employee checks in after 8 AM
            if (checkInTime.isBefore(startOfWorkDay)) {
                // If check-in is before 8 AM, mark as present (no late)
                status = AttendanceStatus.PRESENT;
            } else {
                // If check-in is after 8 AM, mark as late and calculate late minutes
                status = AttendanceStatus.LATE;
                // Calculate late minutes accurately
                lateMin = Math.toIntExact(Duration.between(startOfWorkDay, checkInTime).toMinutes()); // Calculate late minutes
            }

            // Create new attendance record
            EmpDailyAtts attendance = new EmpDailyAtts();
            attendance.setId(generateAttendanceId());
            attendance.setEmployee(employee);
            attendance.setDate(todayDate);
            attendance.setCheckInTime(checkInTime);
            attendance.setStatus(status);  // Set status as PRESENT or LATE
            attendance.setLateMin(lateMin);

            attendanceRepository.save(attendance);

            // Map entity to DTO
            AttendanceDTO attendanceDTO = modelMapper.map(attendance, AttendanceDTO.class);

            // Return success response
            response.setStatusCode(200);
            response.setMessage("Check-in successful.");
            response.setAttendance(attendanceDTO);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            return response;
        }
    }

    @Override
    public ReqRes checkOut(String loggedInUsername) {
        ReqRes response = new ReqRes();

        try {
            Employee employee = employeeRepository.findByEmail(loggedInUsername)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            LocalDate todayDate = LocalDate.now();
            LocalTime checkOutTime = LocalTime.now();

            // Check if attendance exists for today
            EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
            if (existingAttendance == null) {
                response.setStatusCode(400);
                response.setError("No check-in found for today.");
                return response;
            }

            // Check if already checked out
            if (existingAttendance.getCheckOutTime() != null) {
                response.setStatusCode(400);
                response.setError("Already checked out.");
                return response;
            }

            // Update check-out time
            existingAttendance.setCheckOutTime(checkOutTime);
            attendanceRepository.save(existingAttendance);

            // Convert to DTO
            AttendanceDTO attendanceDTO = modelMapper.map(existingAttendance, AttendanceDTO.class);
            attendanceDTO.setEmployeeName(employee.getName());

            // Success response
            response.setStatusCode(200);
            response.setMessage("Check-out successful.");
            response.setAttendance(attendanceDTO);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            return response;
        }
    }
    public void updateAttendanceForLeave(Employee employee, LocalDate startDate, LocalDate endDate, Leave leave) {
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            if (!dateService.isWorkingDay(currentDate)) {
                // Skip weekends and public holidays
                currentDate = currentDate.plusDays(1);
                continue;
            }
            // Check if attendance already exists for that date
            EmpDailyAtts attendance = attendanceRepository.findByEmployeeAndDate(employee, currentDate);

            if (attendance == null) {
                // If no attendance exists, create a new entry
                attendance = new EmpDailyAtts();
                attendance.setId(generateAttendanceId());
                attendance.setEmployee(employee);
                attendance.setDate(currentDate);
            }

            // ✅ Mark the attendance as leave and associate the Leave entity
            attendance.setStatus(AttendanceStatus.LEAVE);
            attendance.setLeave(leave); // Associate Leave entity

            attendanceRepository.save(attendance);

            // Move to the next day
            currentDate = currentDate.plusDays(1);
        }
    }

    // Helper method to get logged-in username (email) from JWT
    private String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    public String generateAttendanceId() {
        // Get the last Attendance ID from the database
        Optional<String> lastIdOptional = attendanceRepository.findLastAttendanceId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "ATT";

        // Generate the new Attendance ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }


}
