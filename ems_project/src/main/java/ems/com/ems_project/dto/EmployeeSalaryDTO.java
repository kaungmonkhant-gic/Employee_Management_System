package ems.com.ems_project.dto;
import ems.com.ems_project.model.EmployeeSalary;

public class EmployeeSalaryDTO {

    private String id;
    private String employeeId;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Double totalSalary;
    private String employeeName;

    public EmployeeSalaryDTO(EmployeeSalary employeeSalary, String employeeName) {
        this.id = employeeSalary.getId();
        this.employeeId = employeeSalary.getEmployee().getId();
        this.basicSalary = employeeSalary.getBasicSalary();
        this.houseAllowance = employeeSalary.getHouseAllowance();
        this.transportation = employeeSalary.getTransportation();
        this.totalSalary = employeeSalary.getTotalSalary();
        this.employeeName = employeeName;
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
        employeeId = employeeId;
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

    public Double getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(Double totalSalary) {
        this.totalSalary = totalSalary;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}
