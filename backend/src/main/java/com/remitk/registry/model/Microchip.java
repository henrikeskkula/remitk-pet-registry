package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "microchips")
public class Microchip {
    @Id
    @NotNull
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "chip_number", nullable = false, length = 50, unique = true)
    private String chipNumber;

    @NotNull
    @Size(max = 255)
    @Column(name = "importer", nullable = false, length = 255)
    private String importer;

    @NotNull
    @Size(max = 20)
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
