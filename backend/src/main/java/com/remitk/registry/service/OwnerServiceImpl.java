package com.remitk.registry.service;

import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;
import com.remitk.registry.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

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
        if (ownerRepository.existsById(owner.getId())) {
            return ownerRepository.save(owner);
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
