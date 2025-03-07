package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ems.com.ems_project.validation.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import ems.com.ems_project.validation.ValidPhoneNumber;
import ems.com.ems_project.validation.ValidGender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RegisterDTO {

    private String id;


    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @ValidEmail
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Phone number is required")
    @ValidPhoneNumber
    private String phone;

    @NotBlank(message = "Gender is required")
    @ValidGender
    private String gender;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    @NotNull(message = "Date of Birth is required")
    private Date dob;

    private String nrc;

    @NotBlank(message = "Marital status is required")
    private String maritalStatus;

    @NotBlank(message = "Address is required")
    private String address;

    @Size(max = 500, message = "Work experience should not exceed 500 characters")
    private String workExp;

    @Size(max = 300, message = "Education should not exceed 300 characters")
    private String education;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    @NotNull(message = "Join date is required")
    private Date joinDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date resignDate;

    // Department, Position, Role
    private String departmentId;
    private String positionId;
    private String roleId;
    private String managerId;

//    // Salary details
//    private Double basicSalary;
//    private Double houseAllowance;
//    private Double transportation;
//    private Double totalSalary;
//
//    // Leave details
//    private Double annualLeave;
//    private Double casualLeave;
//    private Double medicalLeave;
//    private Double totalLeave;


    public RegisterDTO() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getNrc() {
        return nrc;
    }

    public void setNrc(String nrc) {
        this.nrc = nrc;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getWorkExp() {
        return workExp;
    }

    public void setWorkExp(String workExp) {
        this.workExp = workExp;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

//    public Double getBasicSalary() {
//        return basicSalary;
//    }
//
//    public void setBasicSalary(Double basicSalary) {
//        this.basicSalary = basicSalary;
//    }
//
//    public Double getHouseAllowance() {
//        return houseAllowance;
//    }
//
//    public void setHouseAllowance(Double houseAllowance) {
//        this.houseAllowance = houseAllowance;
//    }
//
//    public Double getTransportation() {
//        return transportation;
//    }
//
//    public void setTransportation(Double transportation) {
//        this.transportation = transportation;
//    }
//
//    public Double getTotalSalary() {
//        return totalSalary;
//    }
//
//    public void setTotalSalary(Double totalSalary) {
//        this.totalSalary = totalSalary;
//    }
//
//    public Double getAnnualLeave() {
//        return annualLeave;
//    }
//
//    public void setAnnualLeave(Double annualLeave) {
//        this.annualLeave = annualLeave;
//    }
//
//    public Double getCasualLeave() {
//        return casualLeave;
//    }
//
//    public void setCasualLeave(Double casualLeave) {
//        this.casualLeave = casualLeave;
//    }
//
//    public Double getMedicalLeave() {
//        return medicalLeave;
//    }
//
//    public void setMedicalLeave(Double medicalLeave) {
//        this.medicalLeave = medicalLeave;
//    }
//
//    public Double getTotalLeave() {
//        return totalLeave;
//    }
//
//    public void setTotalLeave(Double totalLeave) {
//        this.totalLeave = totalLeave;
//    }

    public Date getResignDate() {
        return resignDate;
    }

    public void setResignDate(Date resignDate) {
        this.resignDate = resignDate;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }
}
