package ems.com.ems_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



import ems.com.ems_project.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	Optional<Employee> findByEmail(String email);
}
