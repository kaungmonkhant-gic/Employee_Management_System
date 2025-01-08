package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmployeeSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, Integer> {
}
