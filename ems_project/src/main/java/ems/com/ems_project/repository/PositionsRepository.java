package ems.com.ems_project.repository;


import ems.com.ems_project.model.Positions;
import ems.com.ems_project.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PositionsRepository extends JpaRepository<Positions, Integer> {
    Optional<Positions> findById(Integer Id);
}

