package ems.com.ems_project.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
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

    @Column(name = "employee_id", nullable = false, insertable = false, updatable = false)
    private Integer employeeId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "check_in_time")
    private String checkInTime;

    @Column(name = "check_out_time")
    private String checkOutTime;

    @Column(name = "lunch_break")
    private String lunchBreak;

    @Column(name = "late_min")
    private Integer lateMin;

    @Column(name = "is_leave")
    private Boolean isLeave;

    @Column(name = "leave_id", insertable = false, updatable = false)  // Prevent direct modification
    private Integer leaveId; 

    @Column(name = "leave_early")
    private Boolean leaveEarly;
    
    @Column(name = "ot_id", insertable = false, updatable = false)
    private Integer otId;
    
    @OneToOne
    @JoinColumn(name = "leave_id", referencedColumnName = "leave_id")
    private Leaves leave;

    @OneToOne
    @JoinColumn(name = "ot_id", referencedColumnName = "ot_id")
    private Ots overtime;
}
