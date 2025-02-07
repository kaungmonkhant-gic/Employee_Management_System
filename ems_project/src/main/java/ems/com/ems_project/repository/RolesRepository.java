package ems.com.ems_project.repository;

import ems.com.ems_project.model.Roles;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Integer> {
	 Optional<Roles> findById(Integer Id);

    Optional<Roles> findByRoleName(String roleName);
}
