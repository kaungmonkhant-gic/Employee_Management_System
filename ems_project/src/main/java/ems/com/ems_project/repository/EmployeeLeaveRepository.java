package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

//import java.util.List;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeLeaveRepository extends JpaRepository<EmployeeLeave, String> {

    Optional<EmployeeLeave> findByEmployeeId(String employeeId);
    @Query(value = "SELECT id FROM employee_leaves ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastLeaveId();

    // Count total leaves taken by an employee
    int countByEmployeeId(String employeeId);

    // Delete all leaves of an employee
    void deleteByEmployeeId(String employeeId);

}
