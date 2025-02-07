package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee_leaves")
@Data
public class EmployeeLeave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false,unique = true)
    private Integer Id;

    @Column(name = "annual_leave", nullable = false)
    private Double annualLeave;

    @Column(name = "casual_leave")
    private Double casualLeave;
    
    @Column(name = "medical_leave", nullable = false)
    private Double medicalLeave;

    
    @Column(name = "total", nullable = false)
    private Double total;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "id",nullable = false)
    //@JsonIgnore
    private Employee employee;


    public void calculateTotalLeave() {
        this.total = (annualLeave != null ? annualLeave : 0.0) +
                (casualLeave != null ? casualLeave : 0.0) +
                (medicalLeave != null ? medicalLeave : 0.0);
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
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


