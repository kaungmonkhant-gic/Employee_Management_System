package ems.com.ems_project.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import ems.com.ems_project.common.LocalTimeDeserializer;
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
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String lunchBreak;
    private Integer lateMin;
    private Boolean isLeave;
    private Boolean leaveEarly;

    private String employeeName;
    private String managerName;

    // No-argument constructor for ModelMapper
    public AttendanceDTO() {
    }

    public AttendanceDTO(EmpDailyAtts attendance, Employee employee, Employee manager) {
        this.id = attendance.getId();
        this.date = attendance.getDate();
        this.checkInTime = attendance.getCheckInTime();
        this.checkOutTime = attendance.getCheckOutTime();
        this.lunchBreak = attendance.getLunchBreak();
        this.lateMin = attendance.getLateMin();
        this.isLeave = attendance.getIsLeave();
        this.leaveEarly = attendance.getLeaveEarly();

        this.employeeName = (employee != null) ? employee.getName() : null;
        this.managerName = (manager != null) ? manager.getName() : null;

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



    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }



    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}