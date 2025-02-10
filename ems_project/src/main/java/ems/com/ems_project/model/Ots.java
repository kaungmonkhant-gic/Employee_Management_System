package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@Entity
@Table(name = "ots")
@Data
public class Ots {

    @Id
    @Column(name = "id",unique = true,nullable = false)
    private Integer Id;
    
    @Column(length = 10,name = "employee_id",nullable = false)
    private String employeeId;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Date;

    @Column(name = "start_time")
    private LocalTime checkInTime;

    @Column(name = "end_time")
    private LocalTime checkOutTime;


    @Column(name = "ot_time")
    private String otTime;

    @Column(name = "reason")
    private String reason;

    @Column(name = "is_approved")
    private Boolean Approved;

    @Column(length = 10,name = "manager_id",nullable = false)
    private String managerId;

    @Column(name = "is_paid")
    private Boolean Paid;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
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

    public String getOtTime() {
        return otTime;
    }

    public void setOtTime(String otTime) {
        this.otTime = otTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getApproved() {
        return Approved;
    }

    public void setApproved(Boolean approved) {
        Approved = approved;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public Boolean getPaid() {
        return Paid;
    }

    public void setPaid(Boolean paid) {
        Paid = paid;
    }
}
