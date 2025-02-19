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
    private LocalTime startTime;
    private LocalTime endTime;
    private String otTime;
    private String reason;
    private RequestStatus otStatus = RequestStatus.PENDING;
    private String managerName;
    private Boolean isPaid;


    public OtDTO(Ots ot, Employee employee, Employee manager) {
        if (ot != null) {
            this.id = ot.getId(); // Only set ID if ot is not null
            this.date = ot.getDate();
            this.startTime = ot.getStartTime();
            this.endTime = ot.getEndTime();
            this.otTime = ot.getOtTime();
            this.reason = ot.getReason();
            this.otStatus = ot.getStatus();
            this.isPaid = ot.getPaid();
        }
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

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
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

    public RequestStatus getOtStatus() {
        return otStatus;
    }

    public void setOtStatus(RequestStatus otStatus) {
        this.otStatus = otStatus;
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

