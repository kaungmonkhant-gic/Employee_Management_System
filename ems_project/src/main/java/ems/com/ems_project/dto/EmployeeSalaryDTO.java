package ems.com.ems_project.dto;
import ems.com.ems_project.model.Employee;

public class EmployeeSalaryDTO {

    private String employeeId;
    private String employeeName;
    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;

    // Constructor to populate the DTO
    public EmployeeSalaryDTO(Employee employee) {
        this.employeeId = employee.getId();
        this.employeeName = employee.getName();
        if (employee.getPositionSalary() != null) {
            this.basicSalary = employee.getPositionSalary().getBasicSalary();
            this.houseAllowance = employee.getPositionSalary().getHouseAllowance();
            this.transportation = employee.getPositionSalary().getTransportation();
        }
    }

    // Getters and Setters
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
}
