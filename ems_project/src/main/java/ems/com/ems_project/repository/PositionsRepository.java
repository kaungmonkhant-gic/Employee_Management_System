package ems.com.ems_project.repository;


import ems.com.ems_project.model.Positions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionsRepository extends JpaRepository<Positions, Integer> {
}

