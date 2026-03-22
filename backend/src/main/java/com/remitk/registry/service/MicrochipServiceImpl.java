package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.Microchip;
import com.remitk.registry.model.MicrochipStatus;
import com.remitk.registry.repository.MicrochipRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MicrochipServiceImpl implements MicrochipService {
    private final MicrochipRepository microchipRepository;
    public MicrochipServiceImpl(MicrochipRepository microchipRepository) {
        this.microchipRepository = microchipRepository;
    }

    @Override
    public Microchip createMicrochip(Microchip microchip) {
        microchip.setStatus(MicrochipStatus.FREE);
        return microchipRepository.save(microchip);
    }

    @Override
    public Page<Microchip> searchMicrochips(String chipNumber, String importer, Pageable pageable) throws BadRequestException {
        if (chipNumber != null && !chipNumber.isBlank() && importer != null && !importer.isBlank()) {
            throw new BadRequestException("Search is only allowed by one parameter at a time");
        }
        if (chipNumber != null && !chipNumber.isBlank()) {
            return microchipRepository.findByChipNumberContainingIgnoreCase(chipNumber, pageable);
        }
        else if (importer != null && !importer.isBlank()) {
            return microchipRepository.findByImporterContainingIgnoreCase(importer, pageable);
        }
        else {
            return microchipRepository.findAll(pageable);
        }
    }

    @Override
    public Microchip updateMicrochipStatus(Long id, MicrochipStatus status) throws ResourceNotFoundException {
        Optional<Microchip> microchipOptional = microchipRepository.findById(id);
        if (microchipOptional.isEmpty()) {
            throw new ResourceNotFoundException("Microchip not found");
        }
        Microchip microchip = microchipOptional.get();
        microchip.setStatus(status);
        return microchipRepository.save(microchip);
    }

    @Override
    public void deletePetById(Long id) throws ResourceNotFoundException {
        if (!microchipRepository.existsById(id)) {
            throw new ResourceNotFoundException("Microchip not found");
        }
        microchipRepository.deleteById(id);
    }
}
