package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "pet_events")
public class PetEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "event_type", nullable = false, length = 50)
    private String eventType;

    @NotNull
    @Column(name = "event_timestamp", nullable = false, updatable = false)
    private LocalDateTime eventTimestamp;

    @NotNull
    @Size(max = 50)
    @Column(name = "performed_by_role", nullable = false, length = 50)
    private String performedByRole;

    @Column(name = "description")
    private String description;

    @Column(name = "metadata")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false, updatable = false)
    private Pet pet;

    // Constructor for JPA
    protected PetEvent() {}

    // Constructor for initial creation of entity
    public PetEvent(String eventType, LocalDateTime eventTimestamp, String performedByRole, Pet pet, String description, String metadata) {
        this.eventType = eventType;
        this.eventTimestamp = eventTimestamp;
        this.performedByRole = performedByRole;
        this.pet = pet;
        // Description and metadata may be null
        this.description = description;
        this.metadata = metadata;
    }

    // Getters (no setters to ensure immutability)
    public Long getId() {
        return id;
    }

    public String getEventType() {
        return eventType;
    }

    public LocalDateTime getEventTimestamp() {
        return eventTimestamp;
    }

    public String getPerformedByRole() {
        return performedByRole;
    }

    public String getDescription() {
        return description;
    }

    public String getMetadata() {
        return metadata;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Pet getPet() {
        return pet;
    }
}
