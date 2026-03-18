package com.remitk.registry.dto;

import jakarta.validation.constraints.NotNull;

public class InitiateOwnerTransferRequestDTO {
    @NotNull
    private Long newOwnerId;

    public InitiateOwnerTransferRequestDTO(Long newOwnerId) {
        this.newOwnerId = newOwnerId;
    }

    public Long getNewOwnerId() {
        return newOwnerId;
    }
}
