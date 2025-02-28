package ems.com.ems_project.repository;

import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, String > {

    @Query(value = "SELECT id FROM leaves ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastLeaveId();

    List<Leave> findByEmployeeId(String employeeId);
    // Native query to count the number of leaves for a given employee and status
    @Query(value = "SELECT COUNT(*) FROM leaves WHERE employee_id = :employeeId AND status = :status", nativeQuery = true)
    long countByEmployeeIdAndStatus(@Param("employeeId") String employeeId, @Param("status") String status);

    @Query(value = "SELECT status, COUNT(*) FROM leaves WHERE employee_id = :employeeId GROUP BY status", nativeQuery = true)
    List<Object[]> getStatusCountByEmployeeId(@Param("employeeId") String employeeId);


}