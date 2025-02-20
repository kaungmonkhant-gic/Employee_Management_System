package ems.com.ems_project.dto;

import ems.com.ems_project.model.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.sql.Date;
@Getter
@Setter
@Data
public class AttendanceDTO {

    private String id;
    private Date date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String lunchBreak;
    private Integer lateMin;
    private Boolean isLeave;
    private Boolean leaveEarly;
    private LeaveType leaveType;
    private Boolean halfLeave;
    private Date startDate;
    private Date endDate;
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

    public AttendanceDTO(EmpDailyAtts attendance, Leave leave, Ots ot, String employeeName){
        this.id = attendance.getId();
        this.date = attendance.getDate();
        this.checkInTime = attendance.getCheckInTime();
        this.checkOutTime = attendance.getCheckOutTime();
        this.lunchBreak = attendance.getLunchBreak();
        this.lateMin = attendance.getLateMin();
        this.isLeave = attendance.getIsLeave();
        this.leaveEarly = attendance.getLeaveEarly();
        // Handle null values safely to avoid NullPointerException
        this.leaveType = leave.getLeaveType();
        this.halfLeave = leave.getHalfLeave();
        this.startDate = leave.getStartDate();
        this.endDate = leave.getEndDate();
        this.leaveReason = leave.getReason();
        this.leaveStatus = leave.getStatus();
        this.otTime = ot.getOtTime();
        this.otReason = ot.getReason();
        this.otStatus = ot.getStatus();
        this.otPaid = ot.getPaid();

        this.employeeName = employeeName;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    // Setter for date
    public void setDate(Date date) {
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
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
