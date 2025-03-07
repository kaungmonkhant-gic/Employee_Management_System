package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.model.EmployeeSalary;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {


    private int statusCode;
    private String error;
    private String message;
    private String token;
    private EmployeeProfile employeeProfile;
    private List<EmployeeDTO> employeeList;
    private List<EmployeeProfile> employeeProfiles;
    private EmployeeDTO employeeDTO;
    private RegisterDTO registerDTO;
    private Employee employee;
    private EmployeeSalary employeeSalary;
    private EmployeeLeave employeeLeave;

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public EmployeeProfile getEmployeeProfile() {
        return employeeProfile;
    }

    public void setEmployeeProfile(EmployeeProfile employeeProfile) {
        this.employeeProfile = employeeProfile;
    }

    public List<EmployeeDTO> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<EmployeeDTO> employeeList) {
        this.employeeList = employeeList;
    }

    public List<EmployeeProfile> getEmployeeProfiles() {
        return employeeProfiles;
    }

    public void setEmployeeProfiles(List<EmployeeProfile> employeeProfiles) {
        this.employeeProfiles = employeeProfiles;
    }

    public EmployeeDTO getEmployeeDTO() {
        return employeeDTO;
    }

    public void setEmployeeDTO(EmployeeDTO employeeDTO) {
        this.employeeDTO = employeeDTO;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setRegisterDTO(RegisterDTO updatedEmployee) {
    }

    public RegisterDTO getRegisterDTO() {
        return registerDTO;
    }

    public EmployeeSalary getEmployeeSalary() {
        return employeeSalary;
    }

    public void setEmployeeSalary(EmployeeSalary employeeSalary) {
        this.employeeSalary = employeeSalary;
    }

    public EmployeeLeave getEmployeeLeave() {
        return employeeLeave;
    }

    public void setEmployeeLeave(EmployeeLeave employeeLeave) {
        this.employeeLeave = employeeLeave;
    }
}
