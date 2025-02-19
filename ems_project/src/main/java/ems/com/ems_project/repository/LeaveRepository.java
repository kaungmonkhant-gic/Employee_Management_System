package ems.com.ems_project.repository;

import ems.com.ems_project.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, String > {

}
