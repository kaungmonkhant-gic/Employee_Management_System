package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import ems.com.ems_project.common.LocalTimeDeserializer;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;
import java.sql.Date;
import ems.com.ems_project.model.*;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
public class OtDTO {

    private String id;
    private String employeeName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date date;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime startTime;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime endTime;
    private Integer otTime;
    private String reason;
    private RequestStatus otStatus = RequestStatus.PENDING;
    private String managerName;
    private Boolean isPaid;
    private String rejectionReason;



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
            this.rejectionReason = ot.getRejectionReason();
        }
        // Extract employee name and manager name if available
        this.employeeName = (employee != null) ? employee.getName() : null;
        this.managerName = (manager != null) ? manager.getName() : null;

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

    public Integer getOtTime() {
        return otTime;
    }

    public void setOtTime(Integer otTime) {
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

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
