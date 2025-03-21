package ems.com.ems_project.repository;

import ems.com.ems_project.model.TempSalaryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TempSalaryHistoryRepository extends JpaRepository<TempSalaryHistory, String> {

    @Query(value = "SELECT id FROM temp_salary_history ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastTempSalaryId();

    Optional<TempSalaryHistory> findByEmployeeIdAndSalaryMonth(String employeeId, String salaryMonth);
}
