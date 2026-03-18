package com.remitk.registry.dto;

public class InitiateOwnerTransferRequestDTO {
    private Long newOwnerId;

    public InitiateOwnerTransferRequestDTO(Long newOwnerId) {
        this.newOwnerId = newOwnerId;
    }

    public Long getNewOwnerId() {
        return newOwnerId;
    }
}
