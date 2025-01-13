package ems.com.ems_project.service.impl;

import ems.com.ems_project.dto.ReqRes;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public ReqRes getProfile(String email) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Employee> userOptional = employeeRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setEmployee(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("Profile retrieval successful.");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found.");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("An error occurred while retrieving profile: " + e.getMessage());
        }
        return reqRes;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Assuming you are loading the employee using their email (as username) for authentication purposes
        Optional<Employee> employee = employeeRepository.findByEmail(username);

        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("Employee not found with email: " + username);
        }

        Employee emp = employee.get();
        return User.builder()
                .username(emp.getEmail())
                .password(emp.getPassword())  // Assuming Employee model has a password field
                //.roles(emp.getRole())  // Assuming Employee model has a role field
                .build();
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(Integer employeeId) {
        return employeeRepository.findById(employeeId);
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }


}
