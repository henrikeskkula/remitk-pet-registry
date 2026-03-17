package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OwnerService {
    Owner createOwner(Owner owner) throws BadRequestException;
    Owner getOwnerById(Long id) throws ResourceNotFoundException;
    Owner editOwner(Owner owner) throws ResourceNotFoundException, BadRequestException;
    Page<Pet> getPetsByOwnerId(Long id, Pageable pageable) throws ResourceNotFoundException;
}
