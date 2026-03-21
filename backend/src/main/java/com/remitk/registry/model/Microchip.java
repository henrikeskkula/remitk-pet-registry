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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
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
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private MicrochipStatus status;

    // Automatically managed timestamps
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Constructor for JPA
    protected Microchip() {}

    // Constructor for initial creation of entity
    public Microchip(Long id, String chipNumber, String importer, MicrochipStatus status) {
        this.id = id;
        this.chipNumber = chipNumber;
        this.importer = importer;
        this.status = status;
    }

    // ID-only constructor for referencing a microchip in other entities
    public Microchip(Long id) {
        this.id = id;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getChipNumber() {
        return chipNumber;
    }

    public String getImporter() {
        return importer;
    }

    public MicrochipStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setStatus(MicrochipStatus status) {
        this.status = status;
    }
}
