package ems.com.ems_project.model;

import java.util.Collection;
import java.util.Date;
//import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import ems.com.ems_project.validation.ValidDOB;
import ems.com.ems_project.validation.ValidEmail;
import ems.com.ems_project.validation.ValidGender;
import ems.com.ems_project.validation.ValidMaritalStatus;
import ems.com.ems_project.validation.ValidNRC;
import ems.com.ems_project.validation.ValidPassword;
import ems.com.ems_project.validation.ValidPhoneNumber;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Getter
@Setter
@Entity
@Table(name = "employees")
@Data
public class Employee implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "dob")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @ValidDOB
    private Date dob;

    @Column(name = "nrc", unique = true)
    @ValidNRC
    private String nrc;

    @Column(name = "gender",nullable = false)
    @ValidGender
    private String gender;

    @Column(name = "marital_status",nullable = false)
    @ValidMaritalStatus
    private String maritalStatus;

    @Column(name = "phone", unique = true)
    @ValidPhoneNumber
    private String phone;

    @Column(name = "email", unique = true, nullable = false)
    @ValidEmail
    private String email;
    
    @Column(name = "password", nullable = false)
    @ValidPassword
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "education")
    private String education;

    @Column(name = "work_exp")
    private String workExp;

   
    @Column(name = "join_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date joinDate;
    
    @Column(name = "resign_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date resignDate;
    
 // Relationships

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    private Departments department;

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "position_id")
    //@JsonIgnore
    private Positions position;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    //@JsonIgnore
    private Roles role;

    @OneToOne
    @JoinColumn(name = "employee_salary_id", referencedColumnName = "employee_salary_id")
    //@JsonIgnore
    private EmployeeSalary employeeSalary;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
    @JsonIgnore
    public String getUsername() {
        return this.email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return this.employeeId != null && this.employeeId.equals(employee.getEmployeeId());
    }

    @Override
    public int hashCode() {
        return employeeId != null ? employeeId.hashCode() : 0;
    }


    public Integer getDepartmentId() {
        return department != null ? department.getDepartmentId() : null;
    }

    public void setDepartmentId(Integer departmentId) {
        if (department == null) {
            department = new Departments();
        }
        department.setDepartmentId(departmentId);
    }
    
    public Integer getPositionId() {
        return position != null ? position.getPositionId() : null;
    }

    public void setPositionId(Integer positionId) {
        if (position == null) {
            position = new Positions();
        }
        position.setPositionId(positionId);
    }

    public Integer getRoleId() {
        return role != null ? role.getRoleId() : null;
    }

    public void setRoleId(Integer roleId) {
        if (role == null) {
            role = new Roles();
        }
        role.setRoleId(roleId);
    }

    public String getRoleName() {
        return role != null ? role.getRoleName() : null;
   }
    
    public String getDepartmentName() {
        return department != null ? department.getDepartmentName() : null;
    }

    public String getPositionName() {
        return position != null ? position.getPositionName() : null;
    }
}

