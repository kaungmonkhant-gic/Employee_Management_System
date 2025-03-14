package ems.com.ems_project.dto;

import ems.com.ems_project.model.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
@Getter
@Setter
@Data
public class AttendanceDTO {

    private String id;
    private LocalDate date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String lunchBreak;
    private Integer lateMin;
    private Boolean isLeave;
    private Boolean leaveEarly;
    private LeaveType leaveType;
    private Boolean halfLeave;
    private LocalDate startDate;
    private LocalDate endDate;
    private String leaveReason;
    private RequestStatus leaveStatus = RequestStatus.PENDING;
    private String managerName;
    private String otTime;
    private String otReason;
    private RequestStatus otStatus;
    private Boolean otPaid;
    private String employeeName;

    // No-argument constructor for ModelMapper
    public AttendanceDTO() {
    }

    public AttendanceDTO(EmpDailyAtts attendance, Leave leave, Ots ot, String employeeName) {
        this.id = attendance.getId();
        this.date = attendance.getDate();
        this.checkInTime = attendance.getCheckInTime();
        this.checkOutTime = attendance.getCheckOutTime();
        this.lunchBreak = attendance.getLunchBreak();
        this.lateMin = attendance.getLateMin();
        this.isLeave = attendance.getIsLeave();
        this.leaveEarly = attendance.getLeaveEarly();

        // Check if leave is null before accessing its fields
        if (leave != null) {
            this.leaveType = leave.getLeaveType();
            this.halfLeave = leave.getHalfLeave();
            this.startDate = leave.getStartDate();
            this.endDate = leave.getEndDate();
            this.leaveReason = leave.getReason();
            this.leaveStatus = leave.getStatus();
        } else {
            this.leaveType = null;  // or a default value
            this.halfLeave = false;
            this.startDate = null;
            this.endDate = null;
            this.leaveReason = null;
            this.leaveStatus = RequestStatus.PENDING; // or another default value
        }

        //Check if OT is null before accessing its fields
        if (ot != null) {
            this.otTime = ot.getOtTime();
            this.otReason = ot.getReason();
            this.otStatus = ot.getStatus();
            this.otPaid = ot.getPaid();
        } else {
            this.otTime = null;
            this.otReason = null;
            this.otStatus = null;
            this.otPaid = false;  // Default value if needed
        }

        this.employeeName = employeeName;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    // Getter for checkInTime that defaults to current time if it's null
    public LocalTime getCheckInTime() {
        return (checkInTime != null) ? checkInTime : LocalTime.now();
    }

    // Setter for checkInTime
    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getLunchBreak() {
        return lunchBreak;
    }

    public void setLunchBreak(String lunchBreak) {
        this.lunchBreak = lunchBreak;
    }

    public Integer getLateMin() {
        return lateMin;
    }

    public void setLateMin(Integer lateMin) {
        this.lateMin = lateMin;
    }

    public Boolean getIsLeave() {  // Ensure this method exists
        return isLeave;
    }

    public void setIsLeave(Boolean isleave) {
        isLeave = isleave;
    }

    public Boolean getLeaveEarly() {
        return leaveEarly;
    }

    public void setLeaveEarly(Boolean leaveEarly) {
        this.leaveEarly = leaveEarly;
    }

    public LeaveType getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(LeaveType leaveType) {
        this.leaveType = leaveType;
    }

    public Boolean getHalfLeave() {
        return halfLeave;
    }

    public void setHalfLeave(Boolean halfLeave) {
        this.halfLeave = halfLeave;
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

    public String getLeaveReason() {
        return leaveReason;
    }

    public void setLeaveReason(String leaveReason) {
        this.leaveReason = leaveReason;
    }

    public RequestStatus getLeaveStatus() {
        return leaveStatus;
    }

    public void setLeaveStatus(RequestStatus leaveStatus) {
        this.leaveStatus = leaveStatus;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getOtTime() {
        return otTime;
    }

    public void setOtTime(String otTime) {
        this.otTime = otTime;
    }

    public String getOtReason() {
        return otReason;
    }

    public void setOtReason(String otReason) {
        this.otReason = otReason;
    }

    public RequestStatus getOtStatus() {
        return otStatus;
    }

    public void setOtStatus(RequestStatus otStatus) {
        this.otStatus = otStatus;
    }

    public Boolean getOtPaid() {
        return otPaid;
    }

    public void setOtPaid(Boolean otPaid) {
        this.otPaid = otPaid;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}