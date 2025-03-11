package ems.com.ems_project.repository;
import java.util.List;
import java.util.Optional;

import ems.com.ems_project.model.Departments;
import ems.com.ems_project.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;



import ems.com.ems_project.model.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
	Optional<Employee> findByEmail(String email);

	Optional<Employee> findById(String Id);

	List<Employee> findByManager(Employee manager);


	// Check if email already exists
	boolean existsByEmail(String email);

	// Check if phone number already exists
	boolean existsByPhone(String phone);

	// Check if NRC already exists
	boolean existsByNrc(String nrc);

	boolean existsByManagerId(String managerId);


	@Query(value = "SELECT id FROM employees ORDER BY id DESC LIMIT 1", nativeQuery = true)
	Optional<String> findLastEmployeeId();

	@Query("SELECT e FROM Employee e WHERE e.department.id = :departmentId AND e.role.id = :roleId")
	Optional<Employee> findByDepartmentAndRole(String departmentId, String roleId);

	// Fetch resigned employees (resignDate is not null) using JPQL
	@Query("SELECT e FROM Employee e WHERE e.resignDate IS NOT NULL")
	List<Employee> findResignedEmployees();

	// Fetch active employees (resignDate is null) using JPQL
	@Query("SELECT e FROM Employee e WHERE e.resignDate IS NULL")
	List<Employee> findActiveEmployees();

	// Count active employees in a specific department (resignDate is null)
	@Query("SELECT COUNT(e) FROM Employee e WHERE e.resignDate IS NULL AND e.department.id = :departmentId")
	long countActiveEmployeesByDepartmentId(@Param("departmentId") String departmentId);

	@Query("SELECT e FROM Employee e WHERE e.department.id = :departmentId AND e.resignDate IS NULL")
	List<Employee> findActiveEmployeesByDepartmentId(@Param("departmentId") String departmentId);

	@Query("SELECT e FROM Employee e WHERE e.department.id = :departmentId AND e.resignDate IS NOT NULL")
	List<Employee> findResignedEmployeesByDepartmentId(@Param("departmentId") String departmentId);


	// Count resigned employees using JPQL
	@Query("SELECT COUNT(e) FROM Employee e WHERE e.resignDate IS NOT NULL")
	long countResignedEmployees();

	// Count resigned employees using JPQL
	@Query("SELECT COUNT(e) FROM Employee e WHERE e.resignDate IS NULL")
	long countActiveEmployees();

	@Query("SELECT COUNT(e) FROM Employee e WHERE e.role.id = :roleId AND e.resignDate IS NULL")
	long countActiveManagers(@Param("roleId") String roleId);

	List<Employee> findByDepartment(Departments department);

}


