package ems.com.ems_project.service.impl;

import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.service.EmployeeLeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeLeaveServiceImp implements EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository leaveRepository;

    @Override
    public EmployeeLeave getLeaveByEmployeeId(String employeeId) {
        Optional<EmployeeLeave> leave = leaveRepository.findByEmployeeId(employeeId);
        return leave.orElse(null);
    }

    @Override
    public EmployeeLeave saveOrUpdateLeave(EmployeeLeave leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public List<EmployeeLeave> getAllLeaves() {
        return leaveRepository.findAll();
    }
}