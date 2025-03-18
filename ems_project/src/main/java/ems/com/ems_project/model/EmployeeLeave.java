package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee_leaves")
@Data
public class EmployeeLeave {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @Column(name = "annual_leave")
    private Double annualLeave = 0.0;

    @Column(name = "casual_leave")
    private Double casualLeave = 0.0;

    @Column(name = "medical_leave")
    private Double medicalLeave = 0.0;

    @Column(name = "unpaid_leave")
    private Double unpaidLeave = 0.0;

    @Column(name = "total")
    private Double total = 0.0;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private Employee employee;

    public void calculateTotalLeave() {
        this.total = annualLeave + casualLeave + medicalLeave;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getAnnualLeave() {
        return annualLeave;
    }

    public void setAnnualLeave(Double annualLeave) {
        this.annualLeave = annualLeave;
    }

    public Double getCasualLeave() {
        return casualLeave;
    }

    public void setCasualLeave(Double casualLeave) {
        this.casualLeave = casualLeave;
    }

    public Double getMedicalLeave() {
        return medicalLeave;
    }

    public void setMedicalLeave(Double medicalLeave) {
        this.medicalLeave = medicalLeave;
    }

    public Double getUnpaidLeave() {
        return unpaidLeave;
    }

    public void setUnpaidLeave(Double unpaidLeave) {
        this.unpaidLeave = unpaidLeave;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
