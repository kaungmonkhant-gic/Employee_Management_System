package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.model.*;

import java.time.LocalDate;


public class LeaveDTO {

    private String id;
    private LeaveType leaveType;
    private LeaveDuration leaveDuration;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate endDate;
    private Double totalDays;
    private String reason;
    private RequestStatus status = RequestStatus.PENDING;
    private String employeeName;
    private String managerName;
    private String rejectionReason;

    public LeaveDTO(Leave leave, Employee employee, Employee manager) {
        if (leave != null) {
            this.id = leave.getId();
            this.leaveType = leave.getLeaveType();
            this.leaveDuration = leave.getLeaveDuration();
            this.startDate = leave.getStartDate();
            this.endDate = leave.getEndDate();
            this.totalDays = leave.getTotalDays();
            this.reason = leave.getReason();
            this.status = leave.getStatus();
            this.rejectionReason = leave.getRejectionReason();
        }
        // Get employee name
        this.employeeName = employee != null ? employee.getName() : null;

        // Get manager name from employee (self-referencing)
        this.managerName = (manager != null) ? manager.getName() : null;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LeaveType getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(LeaveType leaveType) {
        this.leaveType = leaveType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LeaveDuration getLeaveDuration() {
        return leaveDuration;
    }

    public void setLeaveDuration(LeaveDuration leaveDuration) {
        this.leaveDuration = leaveDuration;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public Double getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(Double totalDays) {
        this.totalDays = totalDays;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}