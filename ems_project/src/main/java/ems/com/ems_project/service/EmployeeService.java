package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeDTO;
import ems.com.ems_project.dto.RegisterDTO;
import ems.com.ems_project.dto.ReqRes;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeService extends UserDetailsService {

    ReqRes getLoggedInEmployeeProfile();
    long getActiveEmployeeCountBasedOnRole(String token);

    EmployeeDTO getEmployeeById(String Id);
    ReqRes updateEmployeeProfile(EmployeeDTO updatedProfile);

//    ReqRes updateProfile(String Id, RegisterDTO updatedProfile);

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

