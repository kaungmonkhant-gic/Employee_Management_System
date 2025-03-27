package ems.com.ems_project.repository;

import ems.com.ems_project.model.Employee;
import ems.com.ems_project.model.Leave;
import ems.com.ems_project.model.LeaveDuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
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

//    @Query(value = "SELECT status, COUNT(*) FROM leaves WHERE employee_id = :employeeId GROUP BY status", nativeQuery = true)
//    List<Object[]> getStatusCountByEmployeeId(@Param("employeeId") String employeeId);

    @Query("SELECT l.status, COUNT(l) FROM Leave l GROUP BY l.status")
    List<Object[]> getStatusCountForAllEmployees();

    @Query("SELECT l.status, COUNT(l) FROM Leave l WHERE l.employee.id = :employeeId GROUP BY l.status")
    List<Object[]> getStatusCountByEmployeeId(@Param("employeeId") String employeeId);

    @Query("SELECT l.status, COUNT(l) FROM Leave l WHERE l.employee.manager.id = :managerId GROUP BY l.status")
    List<Object[]> getStatusCountByManagerId(@Param("managerId") String managerId);

    List<Leave> findByManagerId(String managerId);

    // Check if there are any existing leave records that overlap with the requested dates
    @Query("SELECT COUNT(l) > 0 FROM Leave l WHERE l.employee = :employee AND " +
            "((l.startDate <= :endDate AND l.endDate >= :startDate))")
    boolean existsLeaveOverlap(@Param("employee") Employee employee, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT l FROM Leave l WHERE l.employee = :employee AND :date BETWEEN l.startDate AND l.endDate")
    Optional<Leave> findByEmployeeAndDate(@Param("employee") Employee employee, @Param("date") LocalDate date);

}