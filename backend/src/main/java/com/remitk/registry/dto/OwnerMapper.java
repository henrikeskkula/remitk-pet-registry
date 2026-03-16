package com.remitk.registry.dto;

import com.remitk.registry.model.Owner;

public class OwnerMapper {
    public static Owner toOwner(OwnerDTO ownerDTO) {
        Owner owner;
        if (ownerDTO.getId() == null) {
            owner = new Owner(ownerDTO.getPersonalCode(), ownerDTO.getFirstName(), ownerDTO.getLastName());
        }
        else {
            owner = new Owner(ownerDTO.getId(), ownerDTO.getPersonalCode(), ownerDTO.getFirstName(), ownerDTO.getLastName());
        }
        owner.setAddress(ownerDTO.getAddress());
        owner.setEmail(ownerDTO.getEmail());
        owner.setPhone(ownerDTO.getPhone());
        return owner;
    }

    public static OwnerDTO toOwnerDTO(Owner owner) {
        OwnerDTO dto = new OwnerDTO();
        dto.setId(owner.getId());
        dto.setPersonalCode(owner.getPersonalCode());
        dto.setFirstName(owner.getFirstName());
        dto.setLastName(owner.getLastName());
        dto.setAddress(owner.getAddress());
        dto.setEmail(owner.getEmail());
        dto.setPhone(owner.getPhone());
        return dto;
    }
}
