package ems.com.ems_project.repository;

import ems.com.ems_project.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HolidayRepository extends JpaRepository<Holiday, String> {

}
