package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "employee_leaves")
@Data
public class EmployeeLeave {

    @Id
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
}


