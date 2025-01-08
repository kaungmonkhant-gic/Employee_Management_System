package ems.com.ems_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyAttendance extends JpaRepository<ems.com.ems_project.model.DailyAttendance, Integer> {
}
