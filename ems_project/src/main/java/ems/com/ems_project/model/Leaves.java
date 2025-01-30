package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@Entity
@Table(name = "leaves")
@Data
public class Leaves {

    @Id
    @Column(name = "id",unique = true,nullable = false)
    private Integer Id;

    @Column(name = "leave_type", nullable = false)
    private String leaveType;

    @Column(name = "half_leave")
    private Boolean halfLeave;
 
    
    @Column(name = "start_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @Column(name = "end_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @Column(name = "reason")
    private String reason;

    @Column(length = 10,name = "manager_id",nullable = false)
    private String managerId;

    @Column(name = "is_approved")
    private Boolean isApproved;
    
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id",nullable = false)
    private Employee employee;
    
}

