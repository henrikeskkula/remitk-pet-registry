package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 50)
    private PetEventType type;

    @NotNull
    @Column(name = "event_timestamp", nullable = false, updatable = false)
    private LocalDateTime time;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "performed_by_role", nullable = false, length = 50)
    private UserRole performedByRole;

    // TODO: Optional improvement: consider adding length/text semantics explicitly if long descriptions are expected.
    @Column(name = "description")
    private String description;

    // TODO: Optional improvement: if metadata becomes structured later, consider JSON/JSONB handling.
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
    public PetEvent(PetEventType type, LocalDateTime time, UserRole performedByRole, Pet pet, String description, String metadata) {
        this.type = type;
        this.time = time;
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

    public PetEventType getType() {
        return type;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public UserRole getPerformedByRole() {
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
