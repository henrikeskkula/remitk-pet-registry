package com.remitk.registry.dto;

import com.remitk.registry.model.Microchip;

public class MicrochipMapper {
    public static MicrochipDTO tomicrochipDTO(Microchip microchip) {
        return new MicrochipDTO(microchip.getId(),
                microchip.getChipNumber(),
                microchip.getImporter(),
                microchip.getStatus());
    }

    public static Microchip toMicrochip(MicrochipDTO microchipDTO) {
        return new Microchip(microchipDTO.getId(),
                microchipDTO.getChipNumber(),
                microchipDTO.getImporter(),
                microchipDTO.getStatus());
    }
}
