package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee_salary")
@Data
public class EmployeeSalary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_salary_id")
    private Integer employeeSalaryId;

    @Column(name = "employee_id", nullable = false)
    private Integer employeeId;

    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "house_allowance")
    private Double houseAllowance;

    @Column(name = "transportation")
    private Double transportation;
}
