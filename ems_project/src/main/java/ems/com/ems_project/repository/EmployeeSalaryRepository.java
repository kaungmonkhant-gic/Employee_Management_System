package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmployeeSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, String> {
    Optional<EmployeeSalary> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String id);
}

