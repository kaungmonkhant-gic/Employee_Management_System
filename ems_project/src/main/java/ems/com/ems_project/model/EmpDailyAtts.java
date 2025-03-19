package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "emp_daily_atts")
@Data
public class EmpDailyAtts {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;


    @Column(name = "date",nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "check_in_time")
    private LocalTime checkInTime;

    @Column(name = "updated_check_in_time")
    private LocalTime updatedCheckInTime;

    @Column(name = "check_out_time")
    private LocalTime checkOutTime;

    @Column(name = "updated_check_out_time")
    private LocalTime updatedCheckOutTime;

    @Column(name = "lunch_break")
    private String lunchBreak;

    @Column(name = "late_min")
    private Integer lateMin = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AttendanceStatus status = AttendanceStatus.ABSENT;

    @Column(name = "leave_early")
    private Boolean leaveEarly;

    @Column(name = "reason")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "request_status")
    private RequestStatus requestStatus = RequestStatus.PENDING;
    @ManyToOne
    @JoinColumn(name = "leave_id", referencedColumnName = "id")
    private Leave leave;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ot_id", referencedColumnName = "id")
    private Ots overtime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @JsonIgnore
    private Employee employee;

    // Add the manager field
    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading is used to prevent unnecessary loading of manager data
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    @JsonIgnore
    private Employee manager;  // Assuming the manager is also an Employee

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

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public Boolean getLeaveEarly() {
        return leaveEarly;
    }

    public void setLeaveEarly(Boolean leaveEarly) {
        this.leaveEarly = leaveEarly;
    }

    public Ots getOvertime() {
        return overtime;
    }

    public void setOvertime(Ots overtime) {
        this.overtime = overtime;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Leave getLeave() {
        return leave;
    }

    public void setLeave(Leave leave) {
        this.leave = leave;
    }

    public LocalTime getUpdatedCheckInTime() {
        return updatedCheckInTime;
    }

    public void setUpdatedCheckInTime(LocalTime updatedCheckInTime) {
        this.updatedCheckInTime = updatedCheckInTime;
    }

    public LocalTime getUpdatedCheckOutTime() {
        return updatedCheckOutTime;
    }

    public void setUpdatedCheckOutTime(LocalTime updatedCheckOutTime) {
        this.updatedCheckOutTime = updatedCheckOutTime;
    }


    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }


    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public Integer getLateMin() {
        return lateMin;
    }

    public void setLateMin(Integer lateMin) {
        this.lateMin = lateMin;
    }
}