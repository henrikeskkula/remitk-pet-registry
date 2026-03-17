package com.remitk.registry.dto;

import com.remitk.registry.model.Microchip;
import com.remitk.registry.model.Owner;
import com.remitk.registry.model.Pet;

public class PetMapper {
    public static PetDTO toPetDTO(Pet pet) {
        PetDTO petDTO = new PetDTO();
        petDTO.setId(pet.getId());
        petDTO.setSpecies(pet.getSpecies());
        petDTO.setName(pet.getName());
        petDTO.setSex(pet.getSex());
        petDTO.setBirthDate(pet.getBirthDate());
        petDTO.setBreed(pet.getBreed());
        petDTO.setColor(pet.getColor());
        petDTO.setImageUrl(pet.getImageUrl());
        petDTO.setStatus(pet.getStatus());
        petDTO.setMicrochipId(pet.getMicrochip().getId());
        petDTO.setOwnerId(pet.getOwner().getId());
        return petDTO;
    }

    public static Pet toPet(PetDTO petDTO) {
        Pet pet;
        if (petDTO.getId() == null) {
            pet = new Pet(petDTO.getSpecies(),
                    petDTO.getSex(),
                    new Microchip(petDTO.getMicrochipId()),
                    petDTO.getStatus());
        }
        else {
            pet = new Pet(petDTO.getId(),
                    petDTO.getSpecies(),
                    petDTO.getSex(),
                    new Microchip(petDTO.getMicrochipId()),
                    petDTO.getStatus());
        }
        pet.setName(petDTO.getName());
        pet.setBirthDate(petDTO.getBirthDate());
        pet.setBreed(petDTO.getBreed());
        pet.setColor(petDTO.getColor());
        pet.setImageUrl(petDTO.getImageUrl());
        pet.setOwner(new Owner(petDTO.getOwnerId()));
        return pet;
    }
}
