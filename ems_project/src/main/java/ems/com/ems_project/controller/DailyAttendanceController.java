package ems.com.ems_project.controller;
import ems.com.ems_project.dto.AttendanceDTO;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.service.AttendanceService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class DailyAttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/role/records")
    public ResponseEntity<List<AttendanceDTO>> getAttendanceBasedOnRole(
            @RequestHeader("Authorization") String token) {
        // Extract actual token (remove "Bearer ")
        String actualToken = token.replace("Bearer ", "");

        List<AttendanceDTO> attendanceRecords = attendanceService.getAttendanceRecordRoleBased(actualToken);
        return ResponseEntity.ok(attendanceRecords);
    }

    @GetMapping("/self")
    public ResponseEntity<List<AttendanceDTO>> getAttendanceRecordsForLoggedInUser() {
        List<AttendanceDTO> attendanceRecords = attendanceService.getAttendanceRecordsForLoggedInUser();
        return new ResponseEntity<>(attendanceRecords, HttpStatus.OK);
    }
    @PostMapping("/checkin")
    public ReqRes checkIn(HttpServletRequest request) {
        String loggedInUsername = request.getUserPrincipal().getName();
        return attendanceService.checkIn(loggedInUsername);
    }

    @PostMapping("/checkout")
    public ReqRes checkOut(HttpServletRequest request) {
        String loggedInUsername = request.getUserPrincipal().getName();
        return attendanceService.checkOut(loggedInUsername);
    }
    @GetMapping("/generate-id")
    public String generateAttendanceId() {
        return attendanceService.generateAttendanceId();
    }

}