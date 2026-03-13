package com.remitk.registry.repository;

import com.remitk.registry.model.PetEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetEventRepository extends JpaRepository<PetEvent, Long> {}
