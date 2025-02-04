package ems.com.ems_project.service;

import ems.com.ems_project.model.EmployeeLeave;

import java.util.List;

public interface EmployeeLeaveService {

    // Fetch total leaves taken by an employee
    int getTotalLeavesByEmployeeId(String employeeId);

    // Fetch all leave records for an employee
    List<EmployeeLeave> getLeavesByEmployeeId(String employeeId);

    // Save or update leave record
    EmployeeLeave saveOrUpdateLeave(EmployeeLeave employeeLeave);

    // Delete leave record by employee ID
    void deleteLeavesByEmployeeId(String employeeId);
}
