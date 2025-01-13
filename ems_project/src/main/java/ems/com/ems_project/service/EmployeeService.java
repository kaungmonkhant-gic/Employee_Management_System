package ems.com.ems_project.service;

import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface EmployeeService extends UserDetailsService {

    List<Employee> getAllEmployees();

    Optional<Employee> getEmployeeById(Integer employeeId);

    //Employee addEmployee(Employee employee);

    ReqRes getProfile(String email);

    ReqRes registerEmployee(Employee employee);
}
