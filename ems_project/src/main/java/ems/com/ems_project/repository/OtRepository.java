package ems.com.ems_project.repository;

import ems.com.ems_project.model.Ots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OtRepository extends JpaRepository<Ots, String> {
    @Query(value = "SELECT id FROM ots ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<String> findLastOtId();
//
//    List<Ots> findByIsApproved(Boolean Approved);
}

