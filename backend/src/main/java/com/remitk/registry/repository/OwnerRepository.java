package com.remitk.registry.repository;

import com.remitk.registry.model.Owner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByPersonalCode(String personalCode);
    Optional<Owner> findByPersonalCode(String personalCode);
    Page<Owner> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName, Pageable pageable);
    Page<Owner> findByPersonalCodeContainingIgnoreCase(String personalCode, Pageable pageable);
}
