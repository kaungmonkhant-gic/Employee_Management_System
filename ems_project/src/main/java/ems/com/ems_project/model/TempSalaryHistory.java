package ems.com.ems_project.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "temp_salary_history")
@Data
public class TempSalaryHistory {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "house_allowance")
    private Double houseAllowance;
    
    @Column(name = "late_over")
    private Double lateOver;

    @Column(name = "leave_over")
    private Double leaveOver;
    
    @Column(name = "ot_fee")
    private Double otFee;
    
    @Column(name = "manual_adjustment")
    private Double manualAdjustment;
    
    @Column(name = "bonus")
    private Double bonus;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


}
