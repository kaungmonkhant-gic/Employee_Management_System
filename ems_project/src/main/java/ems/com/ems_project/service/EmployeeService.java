package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.EmployeeProfile;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeService extends UserDetailsService {


    long getActiveEmployeeCountBasedOnRole(String token);


//    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO getEmployeeById(String Id);

    ReqRes getProfile(String email);
    ReqRes updateProfile(String Id, EmployeeProfile updatedProfile);

    //ReqRes registerEmployee(Employee employee);
    ReqRes registerEmployee(RegisterDTO registerDTO);

    // Update an existing employee
    ReqRes updateEmployee(String Id, EmployeeDTO employeeDTO);

    // Delete an employee by ID
    ReqRes deleteEmployee(String id);

    //get last generated Employee Id
    String generateEmployeeId();
    long getActiveManagersCount();


    List<EmployeeDTO> getActiveEmployeesBasedOnRole(String token);
    List<EmployeeDTO> getResignedEmployeesBasedOnRole(String token);
}

