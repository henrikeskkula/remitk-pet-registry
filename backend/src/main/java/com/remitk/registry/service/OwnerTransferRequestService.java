package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.OwnerTransferRequest;

public interface OwnerTransferRequestService {
    OwnerTransferRequest initiateTransferRequest(Long petId, Long newOwnerId) throws ResourceNotFoundException, BadRequestException;
}
