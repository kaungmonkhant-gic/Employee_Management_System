package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@Entity
@Table(name = "ots")
@Data
public class Ots {

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;

    @Column(name = "employee_id")
    private String employeeId;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Date;

    @Column(name = "start_time")
    private LocalTime checkInTime;

    @Column(name = "end_time")
    private LocalTime checkOutTime;


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
