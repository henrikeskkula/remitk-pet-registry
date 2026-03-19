package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Pet;

public interface PetService {
    public Pet registerPet(Pet pet) throws BadRequestException, ResourceNotFoundException;
    public Pet getPetById(Long id) throws ResourceNotFoundException;
    public Pet updatePet(Long id, Pet pet) throws BadRequestException, ResourceNotFoundException;
    void deletePetById(Long id) throws ResourceNotFoundException;
}
