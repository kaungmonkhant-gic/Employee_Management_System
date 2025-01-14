package ems.com.ems_project.model;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@Entity
@Table(name = "employees")
@Data
public class Employee implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "dob")
    @JsonFormat(pattern = "yyyy-MM-dd")
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

    @Column(name = "join_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date joinDate;

    @Column(name = "resign_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
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

    public Integer getEmployeeId() {
        return employeeId;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You can implement your authorities logic here if needed
        return null;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.email;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return this.password;
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

    // Getter and Setter methods for departmentId, positionId, and roleId

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
}
