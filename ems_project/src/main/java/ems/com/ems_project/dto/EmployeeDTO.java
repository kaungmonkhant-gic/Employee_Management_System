package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.model.*;
import lombok.Data;
import java.util.Date;


@Data
public class EmployeeDTO {

    private String id;
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date dob;
    private String password;
    private String nrc;
    private String gender;
    private String maritalStatus;
    private String phone;
    private String email;
    private String address;
    private String education;
    private String workExp;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date joinDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date resignDate;
    private String managerName;

    private String roleName;
    private String positionName;
    private String departmentName;

    // Constructor to initialize the DTO using Employee, Leave, and Salary
    public EmployeeDTO(Employee employee) {
        if (employee != null) {
            this.id = employee.getId();
            this.name = employee.getName();
            this.dob = employee.getDob();
            this.password = employee.getPassword();
            this.nrc = employee.getNrc();
            this.gender = employee.getGender();
            this.maritalStatus = employee.getMaritalStatus();
            this.phone = employee.getPhone();
            this.email = employee.getEmail();
            this.address = employee.getAddress();
            this.education = employee.getEducation();
            this.workExp = employee.getWorkExp();
            this.joinDate = employee.getJoinDate();
            this.resignDate = employee.getResignDate();

            // Set manager name from Employee entity
            this.managerName = (employee.getManager() != null) ? employee.getManager().getName() : null;

            // Extract role, position, and department from Employee entity
            this.roleName = (employee.getRole() != null) ? employee.getRole().getRoleName() : null;
            this.positionName = (employee.getPosition() != null) ? employee.getPosition().getPositionName() : null;
            this.departmentName = (employee.getDepartment() != null) ? employee.getDepartment().getDepartmentName() : null;
        }
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public Date getResignDate() {
        return resignDate;
    }

    public void setResignDate(Date resignDate) {
        this.resignDate = resignDate;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }


    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
}
