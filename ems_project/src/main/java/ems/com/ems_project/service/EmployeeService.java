package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface EmployeeService extends UserDetailsService {

    List<EmployeeProfile> getAllEmployees();
    
    EmployeeProfile getEmployeeById(Integer employeeId);

    Employee addEmployee(Employee employee);

    //Employee getProfile(String email);

	ReqRes getProfile(String email);
}
