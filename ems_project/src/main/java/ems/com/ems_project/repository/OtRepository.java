package ems.com.ems_project.repository;

import ems.com.ems_project.model.Ots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OtRepository extends JpaRepository<Ots, String> {
    @Query(value = "SELECT id FROM ots ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastOtId();

    List<Ots> findByEmployeeId(String employeeId);
    @Query(value = "SELECT status, COUNT(*) FROM ots WHERE employee_id = :employeeId GROUP BY status", nativeQuery = true)
    List<Object[]> getStatusCountByEmployeeId(@Param("employeeId") String employeeId);

    @Query("SELECT ot.status, COUNT(ot) FROM Ots ot GROUP BY ot.status")
    List<Object[]> getStatusCountForAllEmployees();

    @Query("SELECT ot.status, COUNT(ot) FROM Ots ot WHERE ot.employee.manager.id = :managerId GROUP BY ot.status")
    List<Object[]> getStatusCountByManagerId(@Param("managerId") String managerId);

    List<Ots> findByManagerId(String id);

}

