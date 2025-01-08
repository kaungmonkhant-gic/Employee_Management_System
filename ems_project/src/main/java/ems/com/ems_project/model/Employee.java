package ems.com.ems_project.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "employees")
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "nrc", unique = true)
    private String nrc;

    @Column(name = "gender")
    private String gender;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "education")
    private String education;

    @Column(name = "work_exp")
    private String workExp;

    @Column(name = "employee_leave_id",insertable = false, updatable = false)
    private Integer employeeLeaveId;

    @Column(name = "employee_salary_id",insertable = false, updatable = false)
    private Integer employeeSalaryId;

    @Column(name = "department_id" ,insertable = false, updatable = false)
    private Integer departmentId;
    
    @Column(name = "position_id",insertable = false, updatable = false)
    private Integer positionId;

    @Column(name = "role_id",insertable = false, updatable = false)
    private Integer roleId;

    @Column(name = "join_date")
    private Date joinDate;

    @Column(name = "resign_date")
    private Date resignDate;
    
    
 // Relationships

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    private Departments department;

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "position_id")
    private Positions position;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Roles role;

    @OneToOne
    @JoinColumn(name = "employee_salary_id", referencedColumnName = "employee_salary_id")
    private EmployeeSalary employeeSalary;

    @OneToMany
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private List<Leaves> leaves;

    @OneToMany
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private List<EmpDailyAtts> dailyAttendances;

    @OneToMany
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private List<Ots> overtimes;
    
    @OneToMany
    @JoinColumn(name = "paid_by", referencedColumnName = "employee_id")
    private List<SalaryHistory> salariesPaid;

}

