package com.remitk.registry.repository;

import com.remitk.registry.model.Microchip;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MicrochipRepository extends JpaRepository<Microchip, Long> {
    List<Microchip> findByImporterContainingIgnoreCase(String importer, Pageable pageable);
}
