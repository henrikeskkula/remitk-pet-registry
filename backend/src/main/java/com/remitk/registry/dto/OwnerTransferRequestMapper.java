package com.remitk.registry.dto;

import com.remitk.registry.model.OwnerTransferRequest;

public class OwnerTransferRequestMapper {
    public static OwnerTransferRequestDTO toOwnerTransferRequestDTO(OwnerTransferRequest transferRequest) {
        return new OwnerTransferRequestDTO(transferRequest.getId(),
                transferRequest.getStatus(),
                transferRequest.getInitiatedAt(),
                transferRequest.getResolvedAt(),
                transferRequest.getResponseMessage(),
                transferRequest.getPet().getId(),
                transferRequest.getCurrentOwner().getId(),
                transferRequest.getNewOwner().getId());
    }
}
