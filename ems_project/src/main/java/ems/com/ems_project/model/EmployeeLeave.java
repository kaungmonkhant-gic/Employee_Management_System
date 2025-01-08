package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "leaves")
@Data
public class EmployeeLeave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_leave_id")
    private Integer employeeLeaveId;

    @Column(name = "annual_leave", nullable = false)
    private String annualLeave;

    @Column(name = "casual_leave")
    private Boolean casualLeave;
    
    @Column(name = "medical_leave", nullable = false)
    private String medicalLeave;

    
    @Column(name = "total", nullable = false)
    private Double total;
}


