package ems.com.ems_project.repository;

import java.util.Optional;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;



import ems.com.ems_project.model.Employee;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
	Optional<Employee> findByEmail(String email);
	Optional<Employee> findById(String Id);

	// Check if email already exists
	boolean existsByEmail(String email);

	// Check if phone number already exists
	boolean existsByPhone(String phone);

	// Check if NRC already exists
	boolean existsByNrc(String nrc);

	@Query(value = "SELECT id FROM employees ORDER BY id DESC LIMIT 1", nativeQuery = true)
	Optional<String> findLastEmployeeId();

	Optional<Object> findByDepartmentAndRole(Departments department, Roles role);
}


