package ems.com.ems_project.repository;

import ems.com.ems_project.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeavesRepository extends JpaRepository<Leave, Integer> {
}
