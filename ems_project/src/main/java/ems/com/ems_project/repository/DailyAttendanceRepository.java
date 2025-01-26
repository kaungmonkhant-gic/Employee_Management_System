package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmpDailyAtts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyAttendanceRepository extends JpaRepository<EmpDailyAtts, Integer> {
    List<EmpDailyAtts> findAll();
}
