package com.remitk.registry.service;

import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OwnerService {
    Owner createOwner(Owner owner);
    Owner getOwnerById(Long id) throws ResourceNotFoundException;
    Owner editOwner(Owner owner) throws ResourceNotFoundException;
    List<Pet> getPetsByOwnerId(Long id) throws ResourceNotFoundException;
}
