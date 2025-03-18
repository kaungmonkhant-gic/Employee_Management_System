package ems.com.ems_project.repository;

import ems.com.ems_project.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;


public interface HolidayRepository extends JpaRepository<Holiday, String> {
    boolean existsByDate(LocalDate date);

}
