package com.remitk.registry.controller;

import com.remitk.registry.dto.InitiateOwnerTransferRequestDTO;
import com.remitk.registry.dto.OwnerTransferRequestDTO;
import com.remitk.registry.dto.OwnerTransferRequestMapper;
import com.remitk.registry.service.OwnerTransferRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerTransferRequestController {
    private final OwnerTransferRequestService ownerTransferRequestService;

    public OwnerTransferRequestController(OwnerTransferRequestService ownerTransferRequestService) {
        this.ownerTransferRequestService = ownerTransferRequestService;
    }

    @PostMapping("/api/pets/{id}/transfer")
    public ResponseEntity<OwnerTransferRequestDTO> initiateTransferRequest(@PathVariable Long id,
                                                                           @Valid @RequestBody InitiateOwnerTransferRequestDTO initiateRequestDTO) throws BadRequestException, ResourceNotFoundException {
        OwnerTransferRequestDTO transferRequest = OwnerTransferRequestMapper.toOwnerTransferRequestDTO(
                ownerTransferRequestService.initiateTransferRequest(id, initiateRequestDTO.getNewOwnerId())
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(transferRequest);
    }

    @PostMapping("/api/transfers/{id}/accept")
    public ResponseEntity<Void> acceptTransferRequest(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        ownerTransferRequestService.acceptTransferRequest(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/transfers/{id}/reject")
    public ResponseEntity<Void> rejectTransferRequest(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        ownerTransferRequestService.rejectTransferRequest(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/transfers/{id}/cancel")
    public ResponseEntity<Void> cancelTransferRequest(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        ownerTransferRequestService.cancelTransferRequest(id);
        return ResponseEntity.ok().build();
    }
}
