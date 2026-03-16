package com.remitk.registry.service;

import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;
import com.remitk.registry.repository.OwnerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;

    public OwnerServiceImpl(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    @Override
    public Owner createOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    @Override
    public Owner getOwnerById(Long id) throws ResourceNotFoundException {
        Optional<Owner> ownerOptional = ownerRepository.findById(id);
        return ownerOptional.orElseThrow(() -> new ResourceNotFoundException("Owner not found"));
    }

    @Override
    public Owner editOwner(Owner owner) throws ResourceNotFoundException {
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
    public List<Pet> getPetsByOwnerId(Long id) throws ResourceNotFoundException {
        Optional<Owner> ownerOptional = ownerRepository.findById(id);
        return ownerOptional.orElseThrow(() -> new ResourceNotFoundException("Owner not found")).getPets();
    }
}
