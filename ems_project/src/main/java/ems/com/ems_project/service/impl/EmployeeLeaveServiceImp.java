package ems.com.ems_project.service.impl;

import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.EmployeeLeaveRepository;
import ems.com.ems_project.service.EmployeeLeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeLeaveServiceImp implements EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Override
    public int getTotalLeavesByEmployeeId(String employeeId) {
        return employeeLeaveRepository.countByEmployeeId(employeeId);
    }

    @Override
    public List<EmployeeLeave> getLeavesByEmployeeId(String employeeId) {
        return List.of();
    }

//    @Override
//    public List<EmployeeLeave> getLeavesByEmployeeId(String employeeId) {
//        return employeeLeaveRepository.findByEmployeeId(employeeId);
//    }

    @Override
    public EmployeeLeave saveOrUpdateLeave(EmployeeLeave employeeLeave) {
        return employeeLeaveRepository.save(employeeLeave);
    }

    @Override
    public void deleteLeavesByEmployeeId(String employeeId) {
        employeeLeaveRepository.deleteByEmployeeId(employeeId);
    }
}
