package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmpDailyAtts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpDailyAttsRepository extends JpaRepository<EmpDailyAtts, Integer> {
}
