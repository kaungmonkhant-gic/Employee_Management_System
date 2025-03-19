package ems.com.ems_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "employee_salary")
public class EmployeeSalary {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @OneToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @JsonIgnore
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "position_salary_id", referencedColumnName = "id")
    @JsonIgnore
    private PositionSalary positionSalary;

    // Calculate the total salary using the PositionSalary linked to the employee
    public Double getTotalSalary() {
        return (positionSalary.getBasicSalary() != null ? positionSalary.getBasicSalary() : 0.0) +
                (positionSalary.getHouseAllowance() != null ? positionSalary.getHouseAllowance() : 0.0) +
                (positionSalary.getTransportation() != null ? positionSalary.getTransportation() : 0.0);
    }


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

    public PositionSalary getPositionSalary() {
        return positionSalary;
    }

    public void setPositionSalary(PositionSalary positionSalary) {
        this.positionSalary = positionSalary;
    }

}
