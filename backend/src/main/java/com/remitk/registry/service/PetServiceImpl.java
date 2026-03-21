package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.*;
import com.remitk.registry.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
public class PetServiceImpl implements PetService{

    private final PetRepository petRepository;
    private final MicrochipRepository microchipRepository;
    private final PetEventRepository petEventRepository;
    private final OwnerRepository ownerRepository;

    public PetServiceImpl(
            PetRepository petRepository,
            MicrochipRepository microchipRepository,
            PetEventRepository petEventRepository,
            OwnerRepository ownerRepository) {
        this.petRepository = petRepository;
        this.microchipRepository = microchipRepository;
        this.petEventRepository = petEventRepository;
        this.ownerRepository = ownerRepository;
    }

    @Override
    @Transactional
    public Pet registerPet(Pet pet) throws BadRequestException, ResourceNotFoundException {

        Microchip chip = microchipRepository.findById(pet.getMicrochip().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Microchip not found"));

        if (chip.getStatus() != MicrochipStatus.FREE) {
            throw new BadRequestException("Microchip already used");
        }

        if (pet.getOwner() != null) {
            Owner owner = ownerRepository.findById(pet.getOwner().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
            pet.setOwner(owner);
        }

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

    @Override
    public Pet getPetById(Long id) throws ResourceNotFoundException {
        Optional<Pet> petOptional = petRepository.findById(id);
        if (petOptional.isEmpty()) {
            throw new ResourceNotFoundException("Pet not found");
        }
        return petOptional.get();
    }

    @Override
    public Pet updatePet(Long id, Pet pet) throws BadRequestException, ResourceNotFoundException {
        Optional<Pet> matchingMicrochipIdPetOptional = petRepository.findByMicrochipId(pet.getMicrochip().getId());
        if (matchingMicrochipIdPetOptional.isPresent()) {
            Pet matchingMicrochipIdPet = matchingMicrochipIdPetOptional.get();
            if (!matchingMicrochipIdPet.getId().equals(id)) {
                throw new BadRequestException("Another pet with this microchipId already exists");
            }
        }
        Optional<Pet> existingPetOptional = petRepository.findById(id);
        if (existingPetOptional.isEmpty()) {
            throw new ResourceNotFoundException("Pet not found");
        }
        Pet existingPet = existingPetOptional.get();
        if (pet.getOwner() != null) {
            Owner owner = ownerRepository.findById(pet.getOwner().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
            existingPet.setOwner(owner);
        }
        existingPet.setMicrochip(pet.getMicrochip());
        existingPet.setSex(pet.getSex());
        existingPet.setName(pet.getName());
        existingPet.setBirthDate(pet.getBirthDate());
        existingPet.setBreed(pet.getBreed());
        existingPet.setColor(pet.getColor());
        PetStatus existingStatus = existingPet.getStatus();
        if (existingStatus == PetStatus.ACTIVE) {
            switch (pet.getStatus()) {
                case ABROAD ->
                    petEventRepository.save(new PetEvent(PetEventType.EXPORTED,
                        LocalDateTime.now(ZoneOffset.UTC),
                        UserRole.OWNER,
                        existingPet,
                        "Pet is exported",
                        null));
                case MISSING ->
                    petEventRepository.save(new PetEvent(PetEventType.MARKED_MISSING,
                        LocalDateTime.now(ZoneOffset.UTC),
                        UserRole.OWNER,
                        existingPet,
                        "Pet is marked missing",
                        null));
                case DECEASED ->
                    petEventRepository.save(new PetEvent(PetEventType.DECEASED,
                        LocalDateTime.now(ZoneOffset.UTC),
                        UserRole.VET,
                        existingPet,
                        "Pet has deceased",
                        null));
            }
        }
        else if (existingStatus == PetStatus.MISSING) {
            if (pet.getStatus() == PetStatus.ACTIVE) {
                petEventRepository.save(new PetEvent(PetEventType.MARKED_FOUND,
                    LocalDateTime.now(ZoneOffset.UTC),
                    UserRole.OWNER,
                    existingPet,
                    "Pet has been found",
                    null));
            }
        }
        existingPet.setStatus(pet.getStatus());
        return petRepository.save(existingPet);
    }

    @Override
    public void deletePetById(Long id) throws ResourceNotFoundException {
        if (!petRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pet not found");
        }
        petRepository.deleteById(id);
    }
}