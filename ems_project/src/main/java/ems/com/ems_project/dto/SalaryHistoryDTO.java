package ems.com.ems_project.dto;

import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.SalaryHistory;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class SalaryHistoryDTO {

    private String id;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Double otFee;
    private Double lateOver;
    private Double leaveOver;
    private Double manualAdjustment;
    private Double bonus;
    private LocalDate date;

    private String employeeName; // Optional to display employee name in DTO
    private String managerName;  // Optional to display manager name in DTO


    // Constructor to map SalaryHistory entity to SalaryHistoryDTO
    public SalaryHistoryDTO(SalaryHistory salaryHistory, Employee employee, Employee manager) {
        if (salaryHistory != null) {
            this.id = salaryHistory.getId();
            this.basicSalary = salaryHistory.getBasicSalary();
            this.houseAllowance = salaryHistory.getHouseAllowance();
            this.transportation = salaryHistory.getTransportation();
            this.otFee = salaryHistory.getOtFee();
            this.lateOver = salaryHistory.getLateOver();
            this.leaveOver = salaryHistory.getLeaveOver();
            this.manualAdjustment = salaryHistory.getManualAdjustment();
            this.bonus = salaryHistory.getBonus();
            this.date = salaryHistory.getDate();
        }
            // Optional, assuming Employee and Manager have getName method
            // Extract employee name and manager name if available
            this.employeeName = (employee != null) ? employee.getName() : null;
            this.managerName = (manager != null) ? manager.getName() : null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Double getOtFee() {
        return otFee;
    }

    public void setOtFee(Double otFee) {
        this.otFee = otFee;
    }

    public Double getLateOver() {
        return lateOver;
    }

    public void setLateOver(Double lateOver) {
        this.lateOver = lateOver;
    }

    public Double getLeaveOver() {
        return leaveOver;
    }

    public void setLeaveOver(Double leaveOver) {
        this.leaveOver = leaveOver;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getTransportation() {
        return transportation;
    }

    public void setTransportation(Double transportation) {
        this.transportation = transportation;
    }
}

