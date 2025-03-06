package ems.com.ems_project.repository;

import ems.com.ems_project.model.SalaryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaryHistoryRepository extends JpaRepository<SalaryHistory, String> {
    List<SalaryHistory> findByEmployeeId(String employeeId);
}

