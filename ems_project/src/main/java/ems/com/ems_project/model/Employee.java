package ems.com.ems_project.model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employees")
@Data
public class Employee implements UserDetails {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(length = 10, nullable = false, unique = true)
    private String id;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "dob")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dob;

    @Column(name = "nrc", unique = true)
    private String nrc;

    @Column(name = "gender",nullable = false)
    private String gender;

    @Column(name = "marital_status",nullable = false)
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate joinDate;
    @Column(name = "resign_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate resignDate;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "department_id",nullable = false)
    private Departments department;

    @ManyToOne
    @JoinColumn(name = "position_id",nullable = false)
    @JsonIgnore
    private Positions position;

    @ManyToOne
    @JoinColumn(name = "role_id",nullable = false)
    @JsonIgnore
    private Roles role;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnore
    // This references another Employee
    private Employee manager;

    @ManyToOne
    @JoinColumn(name = "position_salary_id")
    @JsonIgnore
    private PositionSalary positionSalary;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role != null && role.getRoleName() != null) {
            return List.of(new SimpleGrantedAuthority(role.getRoleName()));
        }
        return List.of(); // Return an empty list if no role is assigned
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
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
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee employee = (Employee) obj;
        return id != null && id.equals(employee.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNrc() {
        return nrc;
    }

    public void setNrc(String nrc) {
        this.nrc = nrc;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getWorkExp() {
        return workExp;
    }

    public void setWorkExp(String workExp) {
        this.workExp = workExp;
    }

    public Departments getDepartment() {
        return department;
    }

    public void setDepartment(Departments department) {
        this.department = department;
    }

    public Positions getPosition() {
        return position;
    }

    public void setPosition(Positions position) {
        this.position = position;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public LocalDate getResignDate() {
        return resignDate;
    }

    public void setResignDate(LocalDate resignDate) {
        this.resignDate = resignDate;
    }

    public String getDepartmentId() {
        return department != null ? department.getId() : null;
    }

    public void setDepartmentId(String departmentId) {
        if (department == null) {
            department = new Departments();
        }
        department.setId(departmentId);
    }

    public String getPositionId() {
        return position != null ? position.getId() : null;
    }

    public void setPositionId(String positionId) {
        if (position == null) {
            position = new Positions();
        }
        position.setId(positionId);
    }


    public String getRoleId() {
        return role != null ? role.getId() : null;
    }

    public void setRoleId(String roleId) {
        if (role == null) {
            role = new Roles();
        }
        role.setId(roleId);
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public PositionSalary getPositionSalary() {
        return positionSalary;
    }

    public void setPositionSalary(PositionSalary positionSalary) {
        this.positionSalary = positionSalary;
    }
}
