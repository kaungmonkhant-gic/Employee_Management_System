package ems.com.ems_project.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.model.*;
import lombok.Data;


@Data
public class SalaryDTO {
    private String employeeId;
    private String employeeName;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Integer lateMinutes;
    private Integer otTime;// From Employee Daily Attendance
    private Double unpaidLeave;
    private Double lateOverFee;
    private Double leaveOverFee;
    private Double otFee;
    private Double manualAdjustment;
    private Double bonus;
    private Double finalSalary;
    @JsonFormat(pattern = "yyyy-MM")
    private String salaryMonth; // From Employee Leave/


    public SalaryDTO(Employee employee, Integer lateMinutes, Integer otTime, Double unpaidLeave) {
        this.employeeId = employee.getId();
        this.employeeName = employee.getName();

        // Fetch salary details from the employee's positionSalary
        PositionSalary positionSalary = employee.getPositionSalary();

        this.basicSalary = (positionSalary != null && positionSalary.getBasicSalary() != null)
                ? positionSalary.getBasicSalary() : 0.0;
        this.houseAllowance = (positionSalary != null && positionSalary.getHouseAllowance() != null)
                ? positionSalary.getHouseAllowance() : 0.0;
        this.transportation = (positionSalary != null && positionSalary.getTransportation() != null)
                ? positionSalary.getTransportation() : 0.0;

        this.lateMinutes = (lateMinutes != null) ? lateMinutes : 0;
        this.otTime = (otTime != null) ? otTime : 0;
        this.unpaidLeave = (unpaidLeave != null) ? unpaidLeave : 0.0;
    }


    public SalaryDTO(TempSalaryHistory tempSalaryHistory) {
        this.employeeId = tempSalaryHistory.getEmployee().getId();
        this.employeeName = tempSalaryHistory.getEmployee().getName(); // Assuming Employee has `getName()`
        this.basicSalary = tempSalaryHistory.getBasicSalary();
        this.houseAllowance = tempSalaryHistory.getHouseAllowance();
        this.transportation = tempSalaryHistory.getTransportation();
        this.lateOverFee = tempSalaryHistory.getLateOverFee();
        this.leaveOverFee = tempSalaryHistory.getLeaveOverFee();
        this.otFee = tempSalaryHistory.getOtFee();
        this.manualAdjustment = tempSalaryHistory.getManualAdjustment();
        this.bonus = tempSalaryHistory.getBonus();
        this.finalSalary = tempSalaryHistory.getFinalSalary();
        this.salaryMonth = tempSalaryHistory.getSalaryMonth();
    }


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getHouseAllowance() {
        return houseAllowance;
    }

    public void setHouseAllowance(Double houseAllowance) {
        this.houseAllowance = houseAllowance;
    }

    public Double getTransportation() {
        return transportation;
    }

    public void setTransportation(Double transportation) {
        this.transportation = transportation;
    }

    public Integer getLateMinutes() {
        return lateMinutes;
    }

    public void setLateMinutes(Integer lateMinutes) {
        this.lateMinutes = lateMinutes;
    }

    public Double getUnpaidLeave() {
        return unpaidLeave;
    }

    public void setUnpaidLeave(Double unpaidLeave) {
        this.unpaidLeave = unpaidLeave;
    }

    public Integer getOtTime() {
        return otTime;
    }

    public void setOtTime(Integer otTime) {
        this.otTime = otTime;
    }

    public Double getLateOverFee() {
        return lateOverFee;
    }

    public void setLateOverFee(Double lateOverFee) {
        this.lateOverFee = lateOverFee;
    }

    public Double getLeaveOverFee() {
        return leaveOverFee;
    }

    public void setLeaveOverFee(Double leaveOverFee) {
        this.leaveOverFee = leaveOverFee;
    }

    public Double getOtFee() {
        return otFee;
    }

    public void setOtFee(Double otFee) {
        this.otFee = otFee;
    }

    public Double getManualAdjustment() {
        return manualAdjustment;
    }

    public void setManualAdjustment(Double manualAdjustment) {
        this.manualAdjustment = manualAdjustment;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setBonus(Double bonus) {
        this.bonus = bonus;
    }

    public Double getFinalSalary() {
        return finalSalary;
    }

    public void setFinalSalary(Double finalSalary) {
        this.finalSalary = finalSalary;
    }

    public String getSalaryMonth() {
        return salaryMonth;
    }

    public void setSalaryMonth(String salaryMonth) {
        this.salaryMonth = salaryMonth;
    }
}

