package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.dto.MicrochipDTO;
import com.remitk.registry.model.Microchip;
import com.remitk.registry.model.MicrochipStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MicrochipService {
    public Microchip createMicrochip(MicrochipDTO microchipDTO);
    public Page<Microchip> searchMicrochips(String chipNumber, String importer, Pageable pageable) throws BadRequestException;
    public Microchip updateMicrochipStatus(Long id, MicrochipStatus status) throws ResourceNotFoundException;
}
