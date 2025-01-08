package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "ots")
@Data
public class Ots {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "ot_id", nullable = false)
    private Integer otId;
    
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "ot_time")
    private String otTime;

    @Column(name = "reason")
    private String reason;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @Column(name = "manager_id")
    private Integer managerId;

    @Column(name = "is_paid")
    private Boolean isPaid;
    
}
