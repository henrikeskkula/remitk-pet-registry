package com.remitk.registry.dto;

import com.remitk.registry.model.OwnerTransferRequestStatus;

import java.time.LocalDateTime;

public class OwnerTransferRequestDTO {
    private Long id;
    private OwnerTransferRequestStatus status;
    private LocalDateTime initiatedAt;
    private LocalDateTime resolvedAt;
    private String responseMessage;
    private Long petId;
    private Long currentOwnerId;
    private Long newOwnerId;

    public OwnerTransferRequestDTO(Long id, OwnerTransferRequestStatus status, LocalDateTime initiatedAt, LocalDateTime resolvedAt, String responseMessage, Long petId, Long currentOwnerId, Long newOwnerId) {
        this.id = id;
        this.status = status;
        this.initiatedAt = initiatedAt;
        this.resolvedAt = resolvedAt;
        this.responseMessage = responseMessage;
        this.petId = petId;
        this.currentOwnerId = currentOwnerId;
        this.newOwnerId = newOwnerId;
    }

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

    public Long getPetId() {
        return petId;
    }

    public Long getCurrentOwnerId() {
        return currentOwnerId;
    }

    public Long getNewOwnerId() {
        return newOwnerId;
    }
}
