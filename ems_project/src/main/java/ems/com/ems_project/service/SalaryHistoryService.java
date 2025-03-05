package ems.com.ems_project.service;

import ems.com.ems_project.dto.SalaryHistoryDTO;
import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.SalaryHistory;
import ems.com.ems_project.repository.EmployeeRepository;
import ems.com.ems_project.repository.SalaryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalaryHistoryService {

    @Autowired
    private SalaryHistoryRepository salaryHistoryRepository;

    @Autowired
    private EmployeeRepository employeeRepository;



    public List<SalaryHistoryDTO> getSalaryRecordsForLoggedInUser() {
        // Find the logged-in employee using the authenticated email
        String loggedInUsername = getLoggedInUsername();
        Employee employee = employeeRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found"));

        // Fetch only OT records related to the logged-in user
        List<SalaryHistory> salaryRecords = salaryHistoryRepository.findByEmployeeId(employee.getId());

        // Convert to DTO format
        return salaryRecords.stream()
                .map(salaryhistory -> new SalaryHistoryDTO(salaryhistory, salaryhistory.getEmployee(), salaryhistory.getManager()))  // Convert OT entity to DTO
                .collect(Collectors.toList());
    }



    // Helper method to get logged-in username (email) from JWT
    private String getLoggedInUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}

