package ems.com.ems_project.service;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.model.*;
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
                leave.setStartDate(todayDate);
                leave.setEndDate(todayDate);
                leave.setLeaveType(LeaveType.UNPAID);
                leave.setLeaveDuration(LeaveDuration.EVENING_HALF);
            }
            // Automatically approve the leave
            leave.setStatus(RequestStatus.APPROVED);

            return leaveRepository.save(leave);
        }
        return null;
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
