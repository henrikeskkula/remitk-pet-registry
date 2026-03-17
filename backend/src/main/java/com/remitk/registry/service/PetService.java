package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.dto.RegisterPetRequest;
import com.remitk.registry.model.*;
import com.remitk.registry.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final MicrochipRepository microchipRepository;
    private final OwnerRepository ownerRepository;
    private final PetEventRepository petEventRepository;

    public PetService(
            PetRepository petRepository,
            MicrochipRepository microchipRepository,
            OwnerRepository ownerRepository,
            PetEventRepository petEventRepository) {
        this.petRepository = petRepository;
        this.microchipRepository = microchipRepository;
        this.ownerRepository = ownerRepository;
        this.petEventRepository = petEventRepository;
    }

    @Transactional
    public Pet registerPet(RegisterPetRequest request) throws BadRequestException, ResourceNotFoundException {

        Microchip chip = microchipRepository.findById(request.getMicrochipId())
                .orElseThrow(() -> new ResourceNotFoundException("Microchip not found"));

        if (chip.getStatus() != MicrochipStatus.FREE) {
            throw new BadRequestException("Microchip already used");
        }

        Owner owner = ownerRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Pet pet = new Pet(
                request.getSpecies(),
                request.getSex(),
                chip,
                PetStatus.ACTIVE
        );
        pet.setName(request.getName());
        pet.setOwner(owner);

        pet = petRepository.save(pet);

        chip.setStatus(MicrochipStatus.USED);
        microchipRepository.save(chip);

        PetEvent event = new PetEvent(
                PetEventType.REGISTERED,
                LocalDateTime.now(),
                UserRole.VET,
                pet,
                "Pet registered",
                null
        );

        petEventRepository.save(event);

        return pet;
    }
}