package ems.com.ems_project.service;

import ems.com.ems_project.model.EmployeeLeave;

import java.util.List;

public interface EmployeeLeaveService {

    EmployeeLeave getLeaveByEmployeeId(String employeeId);
    EmployeeLeave saveOrUpdateLeave(EmployeeLeave leave);
    List<EmployeeLeave> getAllLeaves();
}
