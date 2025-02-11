package ems.com.ems_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



import ems.com.ems_project.model.Employee;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
	Optional<Employee> findByEmail(String email);
	Optional<Employee> findById(String Id);
//	@Query("SELECT MAX(e.id) FROM Employee e")
//	Integer getMaxId();
}

