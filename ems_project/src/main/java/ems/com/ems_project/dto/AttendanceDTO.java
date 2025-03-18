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
    private Boolean leaveEarly;

    private String employeeName;
    private String managerName;


    private String leaveId;  // New field to store leave ID
    private AttendanceStatus status;

    // No-argument constructor for ModelMapper
    public AttendanceDTO() {
    } // New field to track attendance status (LEAVE, PRESENT, HALF_LEAVE)

    // Constructor using EmpDailyAtts
    public AttendanceDTO(EmpDailyAtts attendance, Employee employee, Employee manager) {
        this.id = attendance.getId();
        this.date = attendance.getDate();
        this.checkInTime = attendance.getCheckInTime();
        this.checkOutTime = attendance.getCheckOutTime();
        this.lunchBreak = attendance.getLunchBreak();
        this.lateMin = attendance.getLateMin();
        this.leaveEarly = attendance.getLeaveEarly();
        this.status = attendance.getStatus();

        this.employeeName = (employee != null) ? employee.getName() : null;
        this.managerName = (manager != null) ? manager.getName() : null;

        // Fetch leaveId from the associated Leave entity
        this.leaveId = (attendance.getLeave() != null) ? attendance.getLeave().getId() : null;
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

    public String getLeaveId() {
        return leaveId;
    }

    public void setLeaveId(String leaveId) {
        this.leaveId = leaveId;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }
}