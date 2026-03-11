package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "owner_transfer_requests")
public class OwnerTransferRequest {
    @Id
    @NotNull
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @NotNull
    @Column(name = "initiatedAt", nullable = false, updatable = false)
    private LocalDateTime initiatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "response_message")
    private String responseMessage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "petId", nullable = false, updatable = false)
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_owner_id", nullable = false, updatable = false)
    private Owner currentOwner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "new_owner_id", nullable = false, updatable = false)
    private Owner newOwner;
}