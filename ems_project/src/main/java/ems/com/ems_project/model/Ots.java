package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
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
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Date;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "ot_time")
    private String otTime;

    @Column(name = "reason")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RequestStatus status = RequestStatus.PENDING; // Default to false

    @Column(name = "is_paid")
    private Boolean Paid = false;

    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    @JsonIgnore
    private Employee manager;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private Employee employee;


    // Method to calculate overtime duration as a string (e.g., "2 hours 30 minutes")
    @PrePersist
    @PreUpdate
    private void calculateOvertime() {
        if (startTime != null && endTime != null) {
            this.otTime = calculateOvertimeString(startTime, endTime);
        }
    }

    // Helper method to format overtime duration as string
    private String calculateOvertimeString(LocalTime checkInTime, LocalTime checkOutTime) {
        Duration duration = Duration.between(checkInTime, checkOutTime);
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;

        // Return the overtime duration as a formatted string
        return String.format("%d hours %d minutes", hours, minutes);
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }



    public Date getDate() {
        return Date;
    }

    public void setDate(Date date) {
        Date = date;
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

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Boolean getPaid() {
        return Paid;
    }

    public void setPaid(Boolean paid) {
        Paid = paid;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}