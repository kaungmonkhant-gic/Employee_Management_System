package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "temp_salary_history")
@Data
public class TempSalaryHistory {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "house_allowance")
    private Double houseAllowance;

    @Column(name = "transportation")
    private Double transportation;
    
    @Column(name = "late_over_fee")
    private Double lateOverFee;

    @Column(name = "leave_over_fee")
    private Double leaveOverFee;
    
    @Column(name = "ot_fee")
    private Double otFee;
    
    @Column(name = "manual_adjustment")
    private Double manualAdjustment;
    
    @Column(name = "bonus")
    private Double bonus;

    @Column(name = "final_salary")
    private Double finalSalary;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM")
    @Column(name = "salary_month", length = 7)
    private String salaryMonth;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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

    public Double getTransportation() {
        return transportation;
    }

    public void setTransportation(Double transportation) {
        this.transportation = transportation;
    }

    public String getSalaryMonth() {
        return salaryMonth;
    }

    public void setSalaryMonth(String salaryMonth) {
        this.salaryMonth = salaryMonth;
    }
}
