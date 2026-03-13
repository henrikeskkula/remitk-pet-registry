package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "owner_transfer_requests")
public class OwnerTransferRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private OwnerTransferRequestStatus status;

    @CreationTimestamp
    @Column(name = "initiated_at", nullable = false, updatable = false)
    private LocalDateTime initiatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "response_message")
    private String responseMessage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false, updatable = false)
    private Pet pet;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_owner_id", nullable = false, updatable = false)
    private Owner currentOwner;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "new_owner_id", nullable = false, updatable = false)
    private Owner newOwner;

    // Constructor for JPA
    protected OwnerTransferRequest() {}

    // Constructor for initial creation of entity
    public OwnerTransferRequest(Pet pet, Owner currentOwner, Owner newOwner) {
        this.pet = pet;
        this.currentOwner = currentOwner;
        this.newOwner = newOwner;
        this.status = OwnerTransferRequestStatus.PENDING;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public OwnerTransferRequestStatus getStatus() {
        return status;
    }

    public LocalDateTime getInitiatedAt() {
        return initiatedAt;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Pet getPet() {
        return pet;
    }

    public Owner getCurrentOwner() {
        return currentOwner;
    }

    public Owner getNewOwner() {
        return newOwner;
    }

    public void setStatus(OwnerTransferRequestStatus status) {
        this.status = status;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }
}