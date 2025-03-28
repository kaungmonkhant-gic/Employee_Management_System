package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmpDailyAtts;
import ems.com.ems_project.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface DailyAttendanceRepository extends JpaRepository<EmpDailyAtts, String> {
    List<EmpDailyAtts> findAll();
    List<EmpDailyAtts> findByEmployeeId(String employeeId);
    EmpDailyAtts findByEmployeeAndDate(Employee employee, LocalDate date);

   @Query(value = "SELECT id FROM emp_daily_atts ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastAttendanceId();

    @Query("SELECT COALESCE(SUM(e.lateMin), 0) FROM EmpDailyAtts e WHERE e.employee.id = :employeeId")
    Integer findTotalLateMinutesByEmployeeId(String employeeId);

    @Query("SELECT COALESCE(SUM(e.lateMin), 0) FROM EmpDailyAtts e WHERE e.employee.id = :employeeId AND e.date BETWEEN :startDate AND :endDate")
    Integer findTotalLateMinutesByEmployeeIdAndDateRange(String employeeId, LocalDate startDate, LocalDate endDate);

//    @Query("SELECT e.id, SUM(a.lateMinutes) FROM EmpDailyAtts a JOIN a.employee e WHERE e.id IN :employeeIds GROUP BY e.id")
//    Map<String, Integer> findLateMinutesByEmployeeIds(@Param("employeeIds") List<String> employeeIds);

//    @Query("SELECT e FROM EmpDailyAtts e WHERE e.employeeId = :employeeId AND e.date BETWEEN :startDate AND :endDate")
//    List<EmpDailyAtts> findByEmployeeIdAndDateRange(String id, Date startDate, Date endDate);
}
