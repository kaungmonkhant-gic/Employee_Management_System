package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmployeeSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, String> {
    Optional<EmployeeSalary> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String id);
    @Query(value = "SELECT id FROM employee_salary ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastEmployeeSalaryId();
}

