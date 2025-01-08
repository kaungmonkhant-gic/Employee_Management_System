package ems.com.ems_project.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "salary_history")
@Data
public class SalaryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_salary_id")
    private Integer employeeSalaryId;

    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "house_allowance")
    private Double houseAllowance;
    
    @Column(name = "ot_fee")
    private Double otFee;
    
    @Column(name = "late_over")
    private Double lateOver;

    @Column(name = "leave_over")
    private Double leaveOver;

    @Column(name = "manual_adjustment")
    private Double manualAdjustment;
    
    @Column(name = "bonus")
    private Double bonus;
    
    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "paid_by",nullable = false)
    private Integer paid_by;
    


}
