package ems.com.ems_project.dto;

import ems.com.ems_project.model.EmployeeLeave;

public class EmployeeLeaveDTO {

    private String id;
    private String EmployeeId;
    private Double annualLeave;
    private Double casualLeave;
    private Double medicalLeave;
    private Double total;
    private String employeeName;

    public EmployeeLeaveDTO(EmployeeLeave employeeLeave, String employeeName) {
        this.id = employeeLeave.getId();
        this.EmployeeId = employeeLeave.getEmployee().getId();
        this.annualLeave = employeeLeave.getAnnualLeave();
        this.casualLeave = employeeLeave.getCasualLeave();
        this.medicalLeave = employeeLeave.getMedicalLeave();
        this.total = employeeLeave.getTotal();
        this.employeeName = employeeName;
    }

    // Constructor, Getters, and Setters


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getAnnualLeave() {
        return annualLeave;
    }

    public Double getCasualLeave() {
        return casualLeave;
    }

    public Double getMedicalLeave() {
        return medicalLeave;
    }

    public Double getTotal() {
        return total;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getEmployeeId() {
        return EmployeeId;
    }
}
