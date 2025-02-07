package ems.com.ems_project.service.impl;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.DepartmentsRepository;
import ems.com.ems_project.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImp implements DepartmentService {

    @Autowired
    private DepartmentsRepository departmentsRepository;

    @Override
    public List<Departments> getAllDepartments() {
        return departmentsRepository.findAll();
    }
}