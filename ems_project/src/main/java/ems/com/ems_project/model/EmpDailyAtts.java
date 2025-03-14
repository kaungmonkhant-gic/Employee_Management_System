package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;
import java.sql.Date;

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
//    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

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

    @Column(name = "is_Ot")
    private Boolean isOT;


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

    public Boolean getOT() {
        return isOT;
    }

    public void setOT(Boolean OT) {
        isOT = OT;
    }
}