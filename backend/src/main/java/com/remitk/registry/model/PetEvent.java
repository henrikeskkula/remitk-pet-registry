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
    @NotNull
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
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
    @JoinColumn(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false, updatable = false)
    private Pet pet;
}
