package ems.com.ems_project.service.impl;

import ems.com.ems_project.common.GenerateId;
import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.EmployeeLeave;
import ems.com.ems_project.repository.DepartmentsRepository;
import ems.com.ems_project.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImp implements DepartmentService {

    @Autowired
    private DepartmentsRepository departmentsRepository;

    @Autowired
    private GenerateId generateId;

    @Override
    public List<Departments> getAllDepartments() {
        return departmentsRepository.findAll();
    }

    // Get total count of departments
    public long getTotalDepartmentsCount() {
        return departmentsRepository.countTotalDepartments();
    }
    // Method to generate a new Department ID with a prefix
    public String generateDepartmentId() {
        // Get the last Department ID from the database
        Optional<String> lastDepartmentIdOptional = departmentsRepository.findLastDepartmentId();

        String lastDepartmentId = lastDepartmentIdOptional.orElse(null); // If no ID exists, use null

        // Define the prefix for the Department ID
        String prefix = "DEP"; // You can adjust this prefix as needed

        // Generate the new Department ID using the GenerateId class and the prefix
        return generateId.generateId(lastDepartmentId, prefix);
    }

}