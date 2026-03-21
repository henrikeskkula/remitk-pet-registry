package com.remitk.registry.repository;

import com.remitk.registry.model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Pet> findByOwnerId(Long id, Pageable pageable);
    Optional<Pet> findByMicrochipId(Long id);
}
