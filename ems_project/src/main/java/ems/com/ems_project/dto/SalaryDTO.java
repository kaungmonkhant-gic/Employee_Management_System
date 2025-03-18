package ems.com.ems_project.dto;

import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.PositionSalary;
import lombok.Data;

@Data
public class SalaryDTO {
    private String employeeId;
    private String employeeName;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Integer lateMinutes;  // From Employee Daily Attendance
    private Double unpaidLeave;  // From Employee Leave
    private Double totalSalary;  // You can remove this if you don't want it

    public SalaryDTO(Employee employee, PositionSalary positionSalary, Integer lateMinutes, Double unpaidLeave) {
        this.employeeId = employee.getId();
        this.employeeName = employee.getName();
        this.basicSalary = positionSalary.getBasicSalary();
        this.houseAllowance = positionSalary.getHouseAllowance();
        this.transportation = positionSalary.getTransportation();
        this.lateMinutes = lateMinutes;
        this.unpaidLeave = unpaidLeave;
        // totalSalary can be removed if no calculation is needed
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

    public Double getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(Double totalSalary) {
        this.totalSalary = totalSalary;
    }
}

