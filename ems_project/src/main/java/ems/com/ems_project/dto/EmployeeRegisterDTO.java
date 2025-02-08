package ems.com.ems_project.dto;

import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.model.EmployeeSalary;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRegisterDTO {
    @Valid
    private Employee employee;
    @Valid
    private EmployeeSalary employeeSalary;
    @Valid
    private EmployeeLeave employeeLeave;

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
}
