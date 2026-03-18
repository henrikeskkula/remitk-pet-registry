package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.*;
import com.remitk.registry.repository.OwnerRepository;
import com.remitk.registry.repository.OwnerTransferRequestRepository;
import com.remitk.registry.repository.PetEventRepository;
import com.remitk.registry.repository.PetRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Objects;
import java.util.Optional;

@Service
public class OwnerTransferRequestServiceImpl implements OwnerTransferRequestService {

    private final OwnerTransferRequestRepository ownerTransferRequestRepository;
    private final PetRepository petRepository;
    private final OwnerRepository ownerRepository;
    private final PetEventRepository petEventRepository;
    public OwnerTransferRequestServiceImpl(OwnerTransferRequestRepository ownerTransferRequestRepository, PetRepository petRepository, OwnerRepository ownerRepository, PetEventRepository petEventRepository) {
        this.ownerTransferRequestRepository = ownerTransferRequestRepository;
        this.petRepository = petRepository;
        this.ownerRepository = ownerRepository;
        this.petEventRepository = petEventRepository;
    }

    @Override
    @Transactional
    public OwnerTransferRequest initiateTransferRequest(Long petId, Long newOwnerId) throws ResourceNotFoundException, BadRequestException {
        Optional<Pet> petOptional = petRepository.findById(petId);
        if (petOptional.isEmpty()) {
            throw new ResourceNotFoundException("Pet not found");
        }
        Pet pet = petOptional.get();
        if (pet.getOwner() == null) {
            throw new ResourceNotFoundException("Pet does not belong to any owner");
        }
        if (!ownerRepository.existsById(newOwnerId)) {
            throw new ResourceNotFoundException("New owner not found");
        }
        if (Objects.equals(pet.getOwner().getId(), newOwnerId)) {
            throw new BadRequestException("New owner cannot be the same as the current owner");
        }

        PetEvent petEvent = new PetEvent(PetEventType.OWNER_TRANSFER_INITIATED,
                LocalDateTime.now(ZoneOffset.UTC),
                UserRole.OWNER,
                pet,
                "Initiated owner transfer",
                "{newOwnerId: " + newOwnerId + "}");
        petEventRepository.save(petEvent);

        OwnerTransferRequest transferRequest = new OwnerTransferRequest(pet,
                pet.getOwner(),
                new Owner(newOwnerId));

        return ownerTransferRequestRepository.save(transferRequest);
    }

}
