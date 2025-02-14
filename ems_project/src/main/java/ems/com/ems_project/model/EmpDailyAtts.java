package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "emp_daily_atts")
@Data
public class EmpDailyAtts {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Integer Id;


    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Date;

    @Column(name = "check_in_time")
    private LocalTime checkInTime;

    @Column(name = "check_out_time")
    private LocalTime checkOutTime;

    @Column(name = "lunch_break")
    private String lunchBreak;

    @Column(name = "late_min")
    private Integer lateMin;

    @Column(name = "is_leave")
    private Boolean isLeave;


    @Column(name = "leave_early")
    private Boolean leaveEarly;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "leave_id", referencedColumnName = "id")
    private Leave leave;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ot_id", referencedColumnName = "id")
    private Ots overtime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private Employee employee;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
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
}