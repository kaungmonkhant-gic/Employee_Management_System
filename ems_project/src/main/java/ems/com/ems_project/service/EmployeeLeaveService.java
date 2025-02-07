package ems.com.ems_project.service;

import ems.com.ems_project.dto.EmployeeLeaveDTO;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    public List<EmployeeLeaveDTO> getAllLeavesWithEmployeeName() {
        return employeeLeaveRepository.findAll().stream()
                .map(employeeLeave -> new EmployeeLeaveDTO(employeeLeave, employeeLeave.getEmployee().getName()))
                .toList();
    }
}
