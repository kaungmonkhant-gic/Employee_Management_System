package ems.com.ems_project.repository;

import ems.com.ems_project.model.SalaryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaryHistoryRepository extends JpaRepository<SalaryHistory, String> {

    @Query(value = "SELECT id FROM salary_history ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastSalaryHistoryId();
    
    List<SalaryHistory> findByEmployeeId(String employeeId);

    Optional<SalaryHistory> findByEmployeeIdAndSalaryMonth(String employeeId, String salaryMonth);
}

