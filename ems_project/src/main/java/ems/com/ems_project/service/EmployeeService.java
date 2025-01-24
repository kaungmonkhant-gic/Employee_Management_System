package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeService extends UserDetailsService {

    List<EmployeeProfile> getAllEmployees();
    
    EmployeeProfile getEmployeeById(Integer Id);

    ReqRes getProfile(String email);

    ReqRes registerEmployee(Employee employee);

    // Update an existing employee
    ReqRes updateEmployee(Integer employeeId, Employee employee);

    // Delete an employee by ID
    ReqRes deleteEmployee(Integer employeeId);
}

