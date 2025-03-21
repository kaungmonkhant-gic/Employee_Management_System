package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.SalaryHistory;
import lombok.Data;
import java.time.YearMonth;

@Data
public class SalaryHistoryDTO {
    private String id;
    private String employeeId;
    private String employeeName;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Double lateOverFee;
    private Double leaveOverFee;
    private Double otFee;
    private Double manualAdjustment;
    private Double bonus;
    private Double finalSalary;
    @JsonFormat(pattern = "yyyy-MM")
    private String salaryMonth; // From Employee Leave/// Optional to display manager name in DTO


    // Constructor to map SalaryHistory entity to SalaryHistoryDTO
    public SalaryHistoryDTO(SalaryHistory salaryHistory, Employee employee) {
        if (salaryHistory != null) {
            this.id = salaryHistory.getId();
            this.basicSalary = salaryHistory.getBasicSalary();
            this.houseAllowance = salaryHistory.getHouseAllowance();
            this.transportation = salaryHistory.getTransportation();
            this.otFee = salaryHistory.getOtFee();
            this.lateOverFee = salaryHistory.getLateOverFee();
            this.leaveOverFee= salaryHistory.getLeaveOverFee();
            this.manualAdjustment = salaryHistory.getManualAdjustment();
            this.bonus = salaryHistory.getBonus();
            this.salaryMonth = salaryHistory.getSalaryMonth();
            this.finalSalary = salaryHistory.getFinalSalary();
        }
            // Optional,Employee  has getName method
            this.employeeName = (employee != null) ? employee.getName() : null;
            this.employeeId = (employee != null ) ? employee.getId() : null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

