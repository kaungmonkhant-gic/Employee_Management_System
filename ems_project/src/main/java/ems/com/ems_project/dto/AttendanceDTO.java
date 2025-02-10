package ems.com.ems_project.dto;

import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.Ots;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.sql.Date;
@Getter
@Setter
@Data
public class AttendanceDTO {

    private Integer id;
    private Date Date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String lunchBreak;
    private Integer lateMin;
    private Boolean isLeave;
    private Boolean leaveEarly;
    private String leaveType;
    private Boolean halfLeave;
    private Date startDate;
    private Date endDate;
    private String leaveReason;
    private Boolean leaveApproved;
    private String managerName;
    private String otTime;
    private String otReason;
    private Boolean otApproved;
    private Boolean otPaid;
    private String employeeName;

    public AttendanceDTO(EmpDailyAtts attendance, Leave leave, Ots ot, String employeeName){
        this.id = attendance.getId();
        this.Date = attendance.getDate();
        this.checkInTime = attendance.getCheckInTime();
        this.checkOutTime = attendance.getCheckOutTime();
        this.lunchBreak = attendance.getLunchBreak();
        this.lateMin = attendance.getLateMin();
        this.isLeave = attendance.getIsLeave();
        this.leaveEarly = attendance.getLeaveEarly();
        this.leaveType = leave.getLeaveType();
        this.halfLeave = leave.getHalfLeave();
        this.startDate = leave.getStartDate();
        this.endDate = leave.getEndDate();
        this.leaveReason = leave.getReason();
        this.leaveApproved = leave.getApproved();
        this.otTime = ot.getOtTime();
        this.otReason = ot.getReason();
        this.otApproved = ot.getApproved();
        this.otPaid = ot.getPaid();
        this.employeeName = employeeName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return Date;
    }

    public void setDate(Date date) {
        Date = date;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

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

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
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

    public Boolean getLeaveApproved() {
        return leaveApproved;
    }

    public void setLeaveApproved(Boolean leaveApproved) {
        this.leaveApproved = leaveApproved;
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

    public Boolean getOtApproved() {
        return otApproved;
    }

    public void setOtApproved(Boolean otApproved) {
        this.otApproved = otApproved;
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
