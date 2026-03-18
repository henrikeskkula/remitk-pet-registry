package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.*;
import com.remitk.registry.repository.OwnerRepository;
import com.remitk.registry.repository.OwnerTransferRequestRepository;
import com.remitk.registry.repository.PetEventRepository;
import com.remitk.registry.repository.PetRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OwnerTransferRequestServiceImpl implements OwnerTransferRequestService {

    private final OwnerTransferRequestRepository ownerTransferRequestRepository;
    private final PetRepository petRepository;
    private final OwnerRepository ownerRepository;
    private final PetEventRepository petEventRepository;
    private final Logger logger = LoggerFactory.getLogger(OwnerTransferRequestServiceImpl.class);
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
        Optional<Owner> newOwnerOptional = ownerRepository.findById(newOwnerId);
        if (newOwnerOptional.isEmpty()) {
            throw new ResourceNotFoundException("New owner not found");
        }
        if (Objects.equals(pet.getOwner().getId(), newOwnerId)) {
            throw new BadRequestException("New owner cannot be the same as the current owner");
        }
        List<OwnerTransferRequest> previousOwnerTransferRequests = ownerTransferRequestRepository.findAllByPetId(petId);
        for (OwnerTransferRequest request : previousOwnerTransferRequests) {
            if (request.getStatus() == OwnerTransferRequestStatus.PENDING) {
                throw new BadRequestException("A pending owner transfer request already exists for this pet");
            }
        }

        PetEvent initiatedOwnerTransfer = new PetEvent(PetEventType.OWNER_TRANSFER_INITIATED,
                LocalDateTime.now(ZoneOffset.UTC),
                UserRole.OWNER,
                pet,
                "Initiated owner transfer",
                "{newOwnerId: " + newOwnerId + "}");
        petEventRepository.save(initiatedOwnerTransfer);

        OwnerTransferRequest transferRequest = new OwnerTransferRequest(pet,
                pet.getOwner(),
                newOwnerOptional.get());

        if (transferRequest.getCurrentOwner().getEmail() != null) {
            logger.info("Mock email to {}: New owner transfer of pet with ID {} initiated!",
                    transferRequest.getCurrentOwner().getEmail(), pet.getId());
        }
        if (transferRequest.getNewOwner().getEmail() != null) {
            logger.info("Mock email to {}: New owner transfer of pet with ID {} initiated! Please accept or reject the transfer.",
                    transferRequest.getNewOwner().getEmail(), pet.getId());
        }

        return ownerTransferRequestRepository.save(transferRequest);
    }

    @Override
    @Transactional
    public void acceptTransferRequest(Long id) throws BadRequestException, ResourceNotFoundException {
        OwnerTransferRequest transferRequest = validatePendingTransferRequest(id);
        LocalDateTime resolvedAt = LocalDateTime.now(ZoneOffset.UTC);
        transferRequest.setStatus(OwnerTransferRequestStatus.ACCEPTED);
        transferRequest.setResolvedAt(resolvedAt);

        Pet pet = transferRequest.getPet();
        pet.setOwner(transferRequest.getNewOwner());

        PetEvent completedOwnerTransfer = new PetEvent(PetEventType.OWNER_TRANSFER_COMPLETED,
                resolvedAt,
                UserRole.OWNER,
                pet,
                "Completed owner transfer",
                "{oldOwnerId: " + transferRequest.getCurrentOwner().getId() + ", newOwnerId: " + transferRequest.getNewOwner().getId() + "}");

        ownerTransferRequestRepository.save(transferRequest);
        petEventRepository.save(completedOwnerTransfer);
        petRepository.save(pet);

        if (transferRequest.getCurrentOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} completed successfully!",
                    transferRequest.getCurrentOwner().getEmail(), pet.getId());
        }
        if (transferRequest.getNewOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} completed successfully!",
                    transferRequest.getNewOwner().getEmail(), pet.getId());
        }
    }

    @Override
    public void rejectTransferRequest(Long id) throws BadRequestException, ResourceNotFoundException {
        OwnerTransferRequest transferRequest = validatePendingTransferRequest(id);
        transferRequest.setStatus(OwnerTransferRequestStatus.REJECTED);
        LocalDateTime resolvedAt = LocalDateTime.now(ZoneOffset.UTC);
        transferRequest.setResolvedAt(resolvedAt);

        PetEvent rejectedOwnerTransfer = new PetEvent(PetEventType.OWNER_TRANSFER_REJECTED,
                resolvedAt,
                UserRole.OWNER,
                transferRequest.getPet(),
                "Rejected owner transfer",
                null);
        ownerTransferRequestRepository.save(transferRequest);
        petEventRepository.save(rejectedOwnerTransfer);

        if (transferRequest.getCurrentOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} has been rejected.",
                    transferRequest.getCurrentOwner().getEmail(), transferRequest.getPet().getId());
        }
        if (transferRequest.getNewOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} has been rejected.",
                    transferRequest.getNewOwner().getEmail(), transferRequest.getPet().getId());
        }
    }

    @Override
    public void cancelTransferRequest(Long id) throws BadRequestException, ResourceNotFoundException {
        OwnerTransferRequest transferRequest = validatePendingTransferRequest(id);
        transferRequest.setStatus(OwnerTransferRequestStatus.CANCELLED);
        LocalDateTime resolvedAt = LocalDateTime.now(ZoneOffset.UTC);
        transferRequest.setResolvedAt(resolvedAt);

        PetEvent cancelledOwnerTransfer = new PetEvent(PetEventType.OWNER_TRANSFER_REJECTED,
                resolvedAt,
                UserRole.OWNER,
                transferRequest.getPet(),
                "Cancelled owner transfer",
                null);

        ownerTransferRequestRepository.save(transferRequest);
        petEventRepository.save(cancelledOwnerTransfer);

        if (transferRequest.getCurrentOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} has been cancelled.",
                    transferRequest.getCurrentOwner().getEmail(), transferRequest.getPet().getId());
        }
        if (transferRequest.getNewOwner().getEmail() != null) {
            logger.info("Mock email to {}: Owner transfer of pet with ID {} has been cancelled.",
                    transferRequest.getNewOwner().getEmail(), transferRequest.getPet().getId());
        }
    }

    private OwnerTransferRequest validatePendingTransferRequest(Long id) throws BadRequestException, ResourceNotFoundException {
        Optional<OwnerTransferRequest> transferRequestOptional = ownerTransferRequestRepository.findById(id);
        if (transferRequestOptional.isEmpty()) {
            throw new ResourceNotFoundException("Owner transfer request not found");
        }
        OwnerTransferRequest transferRequest = transferRequestOptional.get();
        if (transferRequest.getStatus() != OwnerTransferRequestStatus.PENDING) {
            throw new BadRequestException("Owner transfer request is completed");
        }
        return transferRequest;
    }
}
