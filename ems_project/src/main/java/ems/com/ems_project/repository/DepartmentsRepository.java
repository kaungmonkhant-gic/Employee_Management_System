package ems.com.ems_project.repository;

import ems.com.ems_project.model.Departments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentsRepository extends JpaRepository<Departments, Integer> {
}

