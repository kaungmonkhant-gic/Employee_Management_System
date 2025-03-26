package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import ems.com.ems_project.common.LocalTimeDeserializer;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "emp_daily_atts", uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "date"}))
@Data
public class EmpDailyAtts {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;


    @Column(name = "date",nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "check_in_time")
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime checkInTime;

    @Column(name = "check_out_time")
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime checkOutTime;

    @Column(name = "lunch_break")
    private String lunchBreak;

    @Column(name = "late_min")
    private Integer lateMin = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AttendanceStatus status;

    @Column(name = "is_ot")
    private Boolean hasOT = Boolean.FALSE;

    @Column(name = "is_leave")
    private Boolean hasLeave = Boolean.FALSE;

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

    public Integer getLateMin() {
        return lateMin;
    }

    public void setLateMin(Integer lateMin) {
        this.lateMin = lateMin;
    }

    public Boolean getHasOT() {
        return hasOT;
    }

    public void setHasOT(Boolean hasOT) {
        this.hasOT = hasOT;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public Boolean getHasLeave() {
        return hasLeave;
    }

    public void setHasLeave(Boolean hasLeave) {
        this.hasLeave = hasLeave;
    }
}