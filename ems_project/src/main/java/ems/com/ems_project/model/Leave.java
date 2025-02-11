package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@Entity
@Table(name = "leaves")
@Data
public class Leave {

    @Id
    @Column(name = "id",unique = true,nullable = false)
    private Integer Id;

    @Column(name = "leave_type", nullable = false)
    private String leaveType;

    @Column(name = "half_leave")
    private Boolean halfLeave;


    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @Column(name = "reason")
    private String reason;

    @Column(length = 10,name = "manager_id",nullable = false)
    private String managerId;

    @Column(name = "is_approved")
    private Boolean Approved;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id",nullable = false)
    private Employee employee;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public Boolean getHalfLeave() {
        return halfLeave;
    }

    public void setHalfLeave(Boolean halfLeave) {
        this.halfLeave = halfLeave;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public Boolean getApproved() {
        return Approved;
    }

    public void setApproved(Boolean approved) {
        Approved = approved;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
