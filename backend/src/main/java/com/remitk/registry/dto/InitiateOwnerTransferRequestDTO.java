package com.remitk.registry.dto;

import jakarta.validation.constraints.NotNull;

public class InitiateOwnerTransferRequestDTO {
    @NotNull
    private Long newOwnerId;

    public InitiateOwnerTransferRequestDTO(Long newOwnerId) {
        this.newOwnerId = newOwnerId;
    }

    public InitiateOwnerTransferRequestDTO() {}

    public void setNewOwnerId(Long newOwnerId) {}

    public Long getNewOwnerId() {
        return newOwnerId;
    }
}
