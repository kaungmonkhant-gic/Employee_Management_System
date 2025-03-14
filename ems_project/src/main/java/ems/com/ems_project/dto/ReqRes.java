package ems.com.ems_project.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.model.EmployeeSalary;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {


    private int statusCode;
    private String error;
    private String message;
    private String token;
    private List<EmployeeDTO> employeeList;
    private EmployeeDTO employeeProfile;
    private RegisterDTO registerDTO;
    private AttendanceDTO attendance;
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

    public List<EmployeeDTO> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<EmployeeDTO> employeeList) {
        this.employeeList = employeeList;
    }


    public EmployeeDTO getEmployeeProfile() {
        return employeeProfile;
    }

    public void setEmployeeProfile(EmployeeDTO employeeProfile) {
        this.employeeProfile = employeeProfile;
    }

    public RegisterDTO getRegisterDTO() {
        return registerDTO;
    }

    public void setRegisterDTO(RegisterDTO registerDTO) {
        this.registerDTO = registerDTO;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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

    public AttendanceDTO getAttendance() {
        return attendance;
    }

    public void setAttendance(AttendanceDTO attendance) {
        this.attendance = attendance;
    }
}
