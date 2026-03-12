package com.remitk.registry.repository;

import com.remitk.registry.model.Owner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    List<Owner> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Owner> findByPersonalCodeContainingIgnoreCase(String personalCode, Pageable pageable);
}
