package ems.com.ems_project.repository;

import ems.com.ems_project.model.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeLeaveRepository extends JpaRepository<EmployeeLeave, String> {

    Optional<EmployeeLeave> findByEmployeeId(String employeeId);

    // Count total leaves taken by an employee
    int countByEmployeeId(String employeeId);

    // Delete all leaves of an employee
    void deleteByEmployeeId(String employeeId);
}
