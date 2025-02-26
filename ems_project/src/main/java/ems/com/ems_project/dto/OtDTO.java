package ems.com.ems_project.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;
import java.sql.Date;
import ems.com.ems_project.model.*;
@Getter
@Setter
public class OtDTO {

    private String id;
    private String employeeName;
    private Date date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String otTime;
    private String reason;
    private Boolean isApproved;
    private String managerName;
    private Boolean isPaid;
    //
    public OtDTO(Ots ot, Employee employee, Employee manager) {
        this.id = ot.getId();
        this.date = ot.getDate();
        this.checkInTime = ot.getCheckInTime();
        this.checkOutTime = ot.getCheckOutTime();
        this.otTime = ot.getOtTime();
        this.reason = ot.getReason();
        this.isApproved = ot.getApproved();
        this.isPaid = ot.getPaid();
        this.employeeName = employee != null ? employee.getName() : null;
        this.managerName = manager != null ? manager.getName() : null;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public Boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(Boolean isPaid) {
        this.isPaid = isPaid;
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

}

