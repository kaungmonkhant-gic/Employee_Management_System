package ems.com.ems_project.service.impl;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.DailyAttendanceRepository;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.LeaveRepository;
import ems.com.ems_project.repository.OtRepository;
import ems.com.ems_project.service.*;
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
    @Autowired
    private LeaveService leaveService;
    @Autowired
    private EmployeeLeaveService employeeLeaveService;

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
            // You can filter attendance based on the manager’s department and role
            attendanceRecords = attendanceRepository.findAll().stream()
                    .filter(attendance -> activeEmployeeIds.contains(attendance.getEmployee().getId())
                            && attendance.getEmployee().getManager() != null
                            && attendance.getEmployee().getManager().getId().equals(manager.getId()))
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
                    return new AttendanceDTO(attendance, attendance.getEmployee());
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
                .map(attendance -> new AttendanceDTO(attendance, attendance.getEmployee()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }

//    @Override
//    public ReqRes checkIn(String loggedInUsername) {
//        ReqRes response = new ReqRes();
//
//        try {
//            Employee employee = employeeRepository.findByEmail(loggedInUsername)
//                    .orElseThrow(() -> new RuntimeException("Employee not found"));
//
//            LocalDate todayDate = LocalDate.now();
//            LocalTime checkInTime = LocalTime.now();
//
//            // Check if attendance already exists for today
//            EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
//            if (existingAttendance != null) {
//                response.setStatusCode(400);
//                response.setError("Attendance already recorded for today.");
//                return response;
//            }
//
//            // Create new attendance record
//            EmpDailyAtts attendance = new EmpDailyAtts();
//            attendance.setId(generateAttendanceId());
//            attendance.setEmployee(employee);
//            attendance.setDate(todayDate);
//            attendance.setCheckInTime(checkInTime);
//            attendance.setStatus(AttendanceStatus.PRESENT);  // Mark as PRESENT
//
//            attendanceRepository.save(attendance);
//
//            //Map entity to DTO, including leave status
//            AttendanceDTO attendanceDTO = new AttendanceDTO(attendance,employee);
//
//            // Return success response
//            response.setStatusCode(200);
//            response.setMessage("Check-in successful.");
//            response.setAttendance(attendanceDTO);
//            return response;
//
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError("Error during check-in: " + e.getMessage());
//            return response;
//        }
//    }
//

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
                return response;
            }

            // Check if employee has leave today
            Optional<Leave> leaveOptional = leaveRepository.findByEmployeeAndDate(employee, todayDate);
            boolean hasLeave = leaveOptional.isPresent();
            Leave leave = hasLeave ? leaveOptional.get() : null;

            AttendanceStatus attendanceStatus = AttendanceStatus.PRESENT;
            int lateMinutes = 0; // Default late minutes

            // If check-in is after 2 PM, check for leave
            if (checkInTime.isAfter(LocalTime.of(14, 0))) {
                if (hasLeave) {
                    attendanceStatus = AttendanceStatus.FULL_LEAVE;
                } else {
                    attendanceStatus = AttendanceStatus.ABSENT;
                    employeeLeaveService.updateUnpaidLeaveBalance(employee, todayDate);
                }
            }
            // If employee has Morning Half Leave, check-in time is after 1 PM
            else if (hasLeave && leave.getLeaveDuration() == LeaveDuration.MORNING_HALF) {
                if (checkInTime.isBefore(LocalTime.of(13, 0))) {
                    // If check-in is before 1 PM, employee is still considered PRESENT with no late minutes
                    attendanceStatus = AttendanceStatus.PRESENT;
                } else {
                    // If check-in is after 1 PM, employee is considered late
                    attendanceStatus = AttendanceStatus.PRESENT;
                    lateMinutes = (int) Duration.between(LocalTime.of(13, 0), checkInTime).toMinutes();
                }
            }
            // Normal check-in scenario (No leave)
            else {
                attendanceStatus = AttendanceStatus.PRESENT;
                if (checkInTime.isAfter(LocalTime.of(8, 0))) {
                    lateMinutes = (int) Duration.between(LocalTime.of(8, 0), checkInTime).toMinutes();
                }
            }

            // Create new attendance record
            EmpDailyAtts attendance = new EmpDailyAtts();
            attendance.setId(generateAttendanceId());
            attendance.setEmployee(employee);
            attendance.setDate(todayDate);
            attendance.setCheckInTime(checkInTime);
            attendance.setStatus(attendanceStatus);
            attendance.setLateMin(lateMinutes); // Store late minutes

            attendanceRepository.save(attendance);

            // Map entity to DTO, including leave status
            AttendanceDTO attendanceDTO = new AttendanceDTO(attendance, employee);

            // Return success response
            response.setStatusCode(200);
            response.setMessage("Check-in successful.");
            response.setAttendance(attendanceDTO);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError("Error during check-in: " + e.getMessage());
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

            // Fetch today's attendance
            EmpDailyAtts attendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
            if (attendance == null) {
                response.setStatusCode(400);
                response.setError("No check-in found for today.");
                return response;
            }

            // Check if already checked out
            if (attendance.getCheckOutTime() != null && !attendance.getCheckOutTime().equals(LocalTime.MIDNIGHT)) {
                response.setStatusCode(400);
                response.setError("Already checked out.");
                return response;
            }

            boolean hasOT = attendance.getHasOT(); // Check if OT is recorded

            // Handle Evening Half Leave creation if needed
            if (!hasOT && checkOutTime.isAfter(LocalTime.of(18, 0))) {
                // Handle the creation or update of Evening Half Leave
                Leave leave = leaveService.handleEveningHalfLeave(employee, todayDate);

                // Set the Leave ID in attendance
                attendance.setLeave(leave); // Link the attendance record with the leave record

                // Set check-out time to midnight, as the employee is on evening half leave
                attendance.setCheckOutTime(LocalTime.MIDNIGHT);
                attendance.setStatus(AttendanceStatus.EVENING_HALF);
            } else {
                // For normal check-out, update with actual check-out time
                attendance.setCheckOutTime(checkOutTime);
            }

            // Save the updated attendance
            attendanceRepository.save(attendance);

            // Convert to DTO
            AttendanceDTO attendanceDTO = modelMapper.map(attendance, AttendanceDTO.class);
            attendanceDTO.setEmployeeName(employee.getName());

            // Success response
            response.setStatusCode(200);
            response.setMessage("Check-out successful.");
            response.setAttendance(attendanceDTO);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError("Error during check-out: " + e.getMessage());
            return response;
        }
    }


//    @Override
//    public ReqRes checkOut(String loggedInUsername) {
//        ReqRes response = new ReqRes();
//
//        try {
//            Employee employee = employeeRepository.findByEmail(loggedInUsername)
//                    .orElseThrow(() -> new RuntimeException("Employee not found"));
//
//            LocalDate todayDate = LocalDate.now();
//            LocalTime checkOutTime = LocalTime.now();
//
//            // Check if attendance exists for today
//            EmpDailyAtts existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, todayDate);
//            if (existingAttendance == null) {
//                response.setStatusCode(400);
//                response.setError("No check-in found for today.");
//                return response;
//            }
//
//            // Check if already checked out
//            if (existingAttendance.getCheckOutTime() != null) {
//                response.setStatusCode(400);
//                response.setError("Already checked out.");
//                return response;
//            }
//
//            // Update check-out time
//            existingAttendance.setCheckOutTime(checkOutTime);
//            attendanceRepository.save(existingAttendance);
//
//            // Convert to DTO
//            AttendanceDTO attendanceDTO = modelMapper.map(existingAttendance, AttendanceDTO.class);
//            attendanceDTO.setEmployeeName(employee.getName());
//
//            // Success response
//            response.setStatusCode(200);
//            response.setMessage("Check-out successful.");
//            response.setAttendance(attendanceDTO);
//            return response;
//
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//            return response;
//        }
//    }


    public void updateAttendanceForLeave(Employee employee, LocalDate startDate, LocalDate endDate, Leave leave) {
        LocalDate currentDate = startDate;

        // Check if the leave status is APPROVED
        if (RequestStatus.APPROVED.equals(leave.getStatus())) {
            // If the leave status is APPROVED, mark the attendance based on the leave duration
            AttendanceStatus leaveStatus = getAttendanceStatusBasedOnLeaveDuration(leave.getLeaveDuration());

            while (!currentDate.isAfter(endDate)) {
                // Skip weekends and public holidays (non-working days)
                if (!dateService.isWorkingDay(currentDate)) {
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

                // Set the attendance status based on the leave duration
                attendance.setStatus(leaveStatus);
                attendance.setLeave(leave);
                attendance.setHasLeave(true);// Associate Leave entity with the attendance record

                // Set check-in and check-out time with default value LocalTime.MIDNIGHT
                attendance.setCheckInTime(LocalTime.MIDNIGHT);  // Set check-in time as midnight
                attendance.setCheckOutTime(LocalTime.MIDNIGHT);

                // Save the attendance record
                attendanceRepository.save(attendance);

                // Move to the next day
                currentDate = currentDate.plusDays(1);
            }
        }
    }
    public void updateOTForAttendance(Employee employee, LocalDate otDate, Ots ot) {
        // Find existing attendance for that date
        EmpDailyAtts attendance = attendanceRepository.findByEmployeeAndDate(employee, otDate);

        if (attendance == null) {
            // Create a new attendance entry if it doesn’t exist
            attendance = new EmpDailyAtts();
            attendance.setId(generateAttendanceId());
            attendance.setEmployee(employee);
            attendance.setDate(otDate);
        }

        // Associate OT with attendance
        attendance.setOvertime(ot);
        attendance.setHasOT(true);
        // Set check-in and check-out time with default value LocalTime.MIDNIGHT
        attendance.setCheckInTime(LocalTime.MIDNIGHT);  // Set check-in time as midnight
        attendance.setCheckOutTime(LocalTime.MIDNIGHT);
        attendanceRepository.save(attendance);
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

    // Helper method to determine the attendance status based on the leave duration
    private AttendanceStatus getAttendanceStatusBasedOnLeaveDuration(LeaveDuration leaveDuration) {
        switch (leaveDuration) {
            case FULL_LEAVE:
                return AttendanceStatus.FULL_LEAVE;
            case MORNING_HALF:
                return AttendanceStatus.MORNING_HALF;
            case EVENING_HALF:
                return AttendanceStatus.EVENING_HALF;
            default:
                return AttendanceStatus.ABSENT; // Default to ABSENT if no matching duration found
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
