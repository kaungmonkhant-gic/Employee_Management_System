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
@Table(name = "emp_daily_atts")
@Data
public class EmpDailyAtts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_daily_att_id")
    private Integer empDailyAttId;
    
    @Column(name = "employee_id")
    private Integer employeeId;
    
    
    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date Date;

    @Column(name = "check_in_time")
    private LocalTime checkInTime;

    @Column(name = "check_out_time")
    private LocalTime checkOutTime;

    @Column(name = "lunch_break")
    private String lunchBreak;

    @Column(name = "late_min")
    private Integer lateMin;

    @Column(name = "is_leave")
    private Boolean isLeave;
 

    @Column(name = "leave_early")
    private Boolean leaveEarly;

    @OneToOne
    @JoinColumn(name = "leave_id", referencedColumnName = "leave_id")
    private Leaves leave;

    @OneToOne
    @JoinColumn(name = "ot_id", referencedColumnName = "ot_id")
    private Ots overtime;
}
