package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data

public class EmployeeDTO {

    private String id;
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dob;

    private String nrc;
    private String gender;
    private String maritalStatus;
    private String phone;
    private String email;
    private String address;
    private String education;
    private String workExp;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date joinDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date resignDate;

    private String roleName;
    private String positionName;
    private String departmentName;

    private Double basicSalary;
    private Double houseAllowance;
    private Double transportation;
    private Double totalSalary;
    // Leave details
    private Double annualLeave;
    private Double casualLeave;
    private Double medicalLeave;
    private Double totalLeave;

    // Getters and Setters

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

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }


    public Double getHouseAllowance() {
        return houseAllowance;
    }

    public void setHouseAllowance(Double houseAllowance) {
        this.houseAllowance = houseAllowance;
    }

    public Double getTransportation() {
        return transportation;
    }

    public void setTransportation(Double transportation) {
        this.transportation = transportation;
    }

    public Double getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(Double totalSalary) {
        this.totalSalary = totalSalary;
    }

    public Double getAnnualLeave() {
        return annualLeave;
    }

    public void setAnnualLeave(Double annualLeave) {
        this.annualLeave = annualLeave;
    }

    public Double getCasualLeave() {
        return casualLeave;
    }

    public void setCasualLeave(Double casualLeave) {
        this.casualLeave = casualLeave;
    }

    public Double getMedicalLeave() {
        return medicalLeave;
    }

    public void setMedicalLeave(Double medicalLeave) {
        this.medicalLeave = medicalLeave;
    }

    public Double getTotalLeave() {
        return totalLeave;
    }

    public void setTotalLeave(Double totalLeave) {
        this.totalLeave = totalLeave;
    }

}
