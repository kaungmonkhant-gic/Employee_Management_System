package ems.com.ems_project.service;
import ems.com.ems_project.model.Departments;
import java.util.List;

public interface DepartmentService {
    List<Departments> getAllDepartments();
    long getTotalDepartmentsCount();
}
