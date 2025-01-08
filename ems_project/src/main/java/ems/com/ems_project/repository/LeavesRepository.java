package ems.com.ems_project.repository;

import ems.com.ems_project.model.Leaves;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeavesRepository extends JpaRepository<Leaves, Integer> {
}
