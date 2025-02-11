package ems.com.ems_project.dto;
import lombok.Data;
import java.util.Date;

@Data
public class SalaryHistoryDTO {
    private Integer id;
    private Double basicSalary;
    private Double houseAllowance;
    private Double otFee;
    private Double lateOver;
    private Double leaveOver;
    private Double manualAdjustment;
    private Double bonus;
    private Date date;
    private Integer paidBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getPaidBy() {
        return paidBy;
    }

    public void setPaidBy(Integer paidBy) {
        this.paidBy = paidBy;
    }
}

