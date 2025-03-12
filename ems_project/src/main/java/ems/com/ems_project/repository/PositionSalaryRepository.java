package ems.com.ems_project.repository;

import ems.com.ems_project.model.PositionSalary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionSalaryRepository extends JpaRepository<PositionSalary ,String > {
    PositionSalary findByPositionId(String id);
}
