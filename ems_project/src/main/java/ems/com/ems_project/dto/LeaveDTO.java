package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.LeaveType;
import ems.com.ems_project.model.RequestStatus;

import java.sql.Date;
import java.time.LocalTime;

public class LeaveDTO {

    private String id;
    private LeaveType leaveType;
    private Boolean halfLeave;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private Date startDate;
    @JsonFormat(pattern = "MM-dd-yyyy")
    private Date endDate;
    private Double totalDays;
    private String reason;
    private RequestStatus status = RequestStatus.PENDING;
    private String employeeName;
    private String managerName;

    public LeaveDTO(Leave leave, Employee employee, Employee manager) {
        this.id = leave.getId();
        this.leaveType = leave.getLeaveType();
        this.halfLeave = leave.getHalfLeave();
        this.startDate = leave.getStartDate();
        this.endDate = leave.getEndDate();
        this.totalDays = leave.getTotalDays();
        this.reason = leave.getReason();
        this.status = leave.getStatus();

        // Get employee name
        this.employeeName = employee != null ? employee.getName() : null;

        // Get manager name from employee (self-referencing)
        this.managerName = (manager != null) ? manager.getName() : null;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LeaveType getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(LeaveType leaveType) {
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

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
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

    public Double getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(Double totalDays) {
        this.totalDays = totalDays;
    }
}