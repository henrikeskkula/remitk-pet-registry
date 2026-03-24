package com.remitk.registry.repository;

import com.remitk.registry.model.PetEvent;
import com.remitk.registry.model.PetEventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetEventRepository extends JpaRepository<PetEvent, Long> {
    public Page<PetEvent> findByPetId(Long petId, Pageable pageable);
    public Page<PetEvent> findByType(PetEventType type, Pageable pageable);
    public Page<PetEvent> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);
}
