package com.remitk.registry.dto;

import com.remitk.registry.model.Pet;
import com.remitk.registry.model.PetEvent;

public class PetEventMapper {
    public static PetEventDTO toPetEventDTO(PetEvent petEvent) {
        PetEventDTO petEventDTO = new PetEventDTO();
        petEventDTO.setId(petEvent.getId());
        petEventDTO.setPetId(petEvent.getPet().getId());
        petEventDTO.setType(petEvent.getEventType());
        petEventDTO.setDescription(petEvent.getDescription());
        petEventDTO.setTime(petEvent.getEventTimestamp());
        return petEventDTO;
    }

    public static PetEvent toPetEvent(PetEventDTO petEventDTO) {
        return new PetEvent(petEventDTO.getType(),
                petEventDTO.getTime(),
                null,
                new Pet(petEventDTO.getPetId()),
                petEventDTO.getDescription(),
                null);
    }
}
