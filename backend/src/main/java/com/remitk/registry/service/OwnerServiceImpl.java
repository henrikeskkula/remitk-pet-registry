package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;
import com.remitk.registry.repository.OwnerRepository;
import com.remitk.registry.repository.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;
    private final PetRepository petRepository;

    public OwnerServiceImpl(OwnerRepository ownerRepository, PetRepository petRepository) {
        this.ownerRepository = ownerRepository;
        this.petRepository = petRepository;
    }

    @Override
    public Owner createOwner(Owner owner) throws BadRequestException {
        if (ownerRepository.existsByPersonalCode(owner.getPersonalCode())) {
            throw new BadRequestException("Person with this personal code already exists!");
        }
        return ownerRepository.save(owner);
    }

    @Override
    public Owner getOwnerById(Long id) throws ResourceNotFoundException {
        Optional<Owner> ownerOptional = ownerRepository.findById(id);
        return ownerOptional.orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
    }

    @Override
    public Owner editOwner(Owner owner) throws ResourceNotFoundException, BadRequestException {
        Optional<Owner> matchingPersonalCodeOwnerOptional = ownerRepository.findByPersonalCode(owner.getPersonalCode());
        if (matchingPersonalCodeOwnerOptional.isPresent() &&
                !matchingPersonalCodeOwnerOptional.get().getId().equals(owner.getId())) {
            throw new BadRequestException("Person with this personal code already exists!");
        }
        Optional<Owner> ownerOptional = ownerRepository.findById(owner.getId());
        if (ownerOptional.isPresent()) {
            Owner existingOwner = ownerOptional.get();
            existingOwner.updateOwner(owner.getPersonalCode(), owner.getFirstName(), owner.getLastName(), owner.getAddress(), owner.getEmail(), owner.getPhone());
            return ownerRepository.save(existingOwner);
        }
        else {
            throw new ResourceNotFoundException("Owner not found");
        }
    }

    @Override
    public Page<Pet> getPetsByOwnerId(Long id, Pageable pageable) throws ResourceNotFoundException {
        if (!ownerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Owner not found");
        }
        return petRepository.findByOwnerId(id, pageable);
    }

    @Override
    public Page<Owner> searchOwners(String name, String personalCode, Pageable pageable) throws BadRequestException {
        if ((name != null && !name.isBlank()) && (personalCode != null && !personalCode.isBlank())) {
            throw new BadRequestException("Search is only allowed by one parameter at a time");
        }
        else if (name != null && !name.isBlank()) {
            return ownerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name, pageable);
        }
        else if (personalCode != null && !personalCode.isBlank()) {
            return ownerRepository.findByPersonalCodeContainingIgnoreCase(personalCode, pageable);
        }
        else {
            return ownerRepository.findAll(pageable);
        }
    }

    @Override
    public void deleteOwnerById(Long id) throws ResourceNotFoundException {
        if (!ownerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Owner not found");
        }
        ownerRepository.deleteById(id);
    }
}
