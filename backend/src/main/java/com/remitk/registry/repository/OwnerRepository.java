package com.remitk.registry.repository;

import com.remitk.registry.model.Owner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Page<Owner> findByFirstNameContainingIgnoreCase(String firstName, Pageable pageable);
    Page<Owner> findByLastNameContainingIgnoreCase(String lastName, Pageable pageable);
    Page<Owner> findByPersonalCodeContainingIgnoreCase(String personalCode, Pageable pageable);
}
