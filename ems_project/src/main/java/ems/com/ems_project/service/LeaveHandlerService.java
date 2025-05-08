package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.model.*;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;


@Service
public class LeaveHandlerService {
    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private GenerateId generateId;

    public Leave handleEveningHalfLeave(Employee employee, LocalDate todayDate, boolean hasOT) {
        if (!hasOT) {
            Optional<Leave> existingLeave = leaveRepository.findByEmployeeAndDate(employee, todayDate);
            Leave leave;

            if (existingLeave.isPresent()) {
                leave = existingLeave.get();
                leave.setLeaveDuration(LeaveDuration.EVENING_HALF);
            } else {
                leave = new Leave();
                leave.setId(generateLeaveId());
                leave.setEmployee(employee);
                leave.setManager(employee.getManager());
                leave.setStartDate(todayDate);
                leave.setEndDate(todayDate);
                leave.setLeaveType(LeaveType.UNPAID);
                leave.setLeaveDuration(LeaveDuration.EVENING_HALF);
            }
            // Set reason and totalDays
            leave.setReason("Forgot to check-out");
            leave.setTotalDays(0.5);
            // Automatically approve the leave
            leave.setStatus(RequestStatus.APPROVED);

            // ✅ Add 0.5 to unpaid leave in EmployeeLeave
            Optional<EmployeeLeave> employeeLeaveOptional = employeeLeaveRepository.findByEmployeeId(employee.getId());
            if (employeeLeaveOptional.isPresent()) {
                EmployeeLeave employeeLeave = employeeLeaveOptional.get();
                double currentUnpaid = employeeLeave.getUnpaidLeave();
                employeeLeave.setUnpaidLeave(currentUnpaid + 0.5);
                employeeLeaveRepository.save(employeeLeave);
            }

            return leaveRepository.save(leave);
        }
        return null;
    }

    public void updateUnpaidLeaveBalance(Employee employee, LocalDate date) {
        // Check if leave already exists to avoid duplicates
        Optional<Leave> existingLeave = leaveRepository.findByEmployeeAndDate(employee, date);
        if (existingLeave.isPresent()) {
            return; // Leave already recorded, skip
        }

        // 1. Create Leave record
        Leave leave = new Leave();
        leave.setId(generateLeaveId());
        leave.setEmployee(employee);
        leave.setManager(employee.getManager());
        leave.setStartDate(date);
        leave.setEndDate(date);
        leave.setLeaveType(LeaveType.UNPAID);
        leave.setLeaveDuration(LeaveDuration.FULL_LEAVE);
        leave.setStatus(RequestStatus.APPROVED);
        leave.setReason("late check-in (after 2 PM)");
        leave.setTotalDays(1.0);
        // Optional: add flag if you want to track system-generated
        // leave.setSystemGenerated(true);

        leaveRepository.save(leave);

        // 2. Update unpaid leave balance
        Optional<EmployeeLeave> employeeLeaveOpt = employeeLeaveRepository.findByEmployeeId(employee.getId());
        if (employeeLeaveOpt.isPresent()) {
            EmployeeLeave employeeLeave = employeeLeaveOpt.get();
            double currentUnpaid = employeeLeave.getUnpaidLeave();
            employeeLeave.setUnpaidLeave(currentUnpaid + 1.0); // Full day
            employeeLeaveRepository.save(employeeLeave);
        }
    }



    public String generateLeaveId() {
        // Get the last Attendance ID from the database
        Optional<String> lastIdOptional = leaveRepository.findLastLeaveId();

        String lastId = lastIdOptional.orElse(null); // If no ID exists, use null

        String prefix = "LEA";

        // Generate the new Attendance ID using the GenerateId class
        return generateId.generateId(lastId,prefix);
    }


}
