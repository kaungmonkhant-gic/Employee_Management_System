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
    private String employeeName;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime checkInTime;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime checkOutTime;
    private Integer lateMin;
    private Boolean hasOT = Boolean.FALSE;

    private String leaveId;  // New field to store leave ID
    private AttendanceStatus status;

    // No-argument constructor for ModelMapper
    public AttendanceDTO() {
    }
    public AttendanceDTO(EmpDailyAtts attendance, Employee employee) {
        this.id = attendance.getId();
        this.date = attendance.getDate();
        // Directly set check-in and check-out times with default fallbacks if needed
        this.checkInTime = attendance.getCheckInTime() != null ? attendance.getCheckInTime() : LocalTime.MIDNIGHT;
        this.checkOutTime = attendance.getCheckOutTime() != null ? attendance.getCheckOutTime() : LocalTime.MIDNIGHT;
        this.lateMin = attendance.getLateMin();
        this.hasOT = attendance.getHasOT();
        this.status = attendance.getStatus();

        // Employee and Manager names
        this.employeeName = (employee != null) ? employee.getName() : null;
//        this.managerName = (manager != null) ? manager.getName() : null;

        // Handle leave ID (could be null if there's no leave associated)
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

    public Integer getLateMin() {
        return lateMin;
    }

    public void setLateMin(Integer lateMin) {
        this.lateMin = lateMin;
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


    public Boolean getHasOT() {
        return hasOT;
    }

    public void setHasOT(Boolean hasOT) {
        this.hasOT = hasOT;
    }

}