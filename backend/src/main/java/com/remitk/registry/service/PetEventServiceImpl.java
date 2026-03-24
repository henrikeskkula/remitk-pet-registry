package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.PetEvent;
import com.remitk.registry.model.PetEventType;
import com.remitk.registry.repository.PetEventRepository;
import com.remitk.registry.repository.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PetEventServiceImpl implements PetEventService {

    private final PetEventRepository petEventRepository;
    private final PetRepository petRepository;

    public PetEventServiceImpl(PetEventRepository petEventRepository, PetRepository petRepository) {
        this.petEventRepository = petEventRepository;
        this.petRepository = petRepository;
    }

    @Override
    public PetEvent createPetEvent(PetEvent petEvent) throws ResourceNotFoundException {
        if (!petRepository.existsById(petEvent.getPet().getId())) {
            throw new ResourceNotFoundException("Pet not found");
        }
        return petEventRepository.save(petEvent);
    }

    @Override
    public Page<PetEvent> searchPetEvents(Long petId, PetEventType eventType, String description, Pageable pageable) throws BadRequestException {
        int parameters = 0;
        if (petId != null) {
            parameters++;
        }
        if (eventType != null) {
            parameters++;
        }
        if (description != null && !description.isBlank()) {
            parameters++;
        }
        if (parameters > 1) {
            throw new BadRequestException("Search is only allowed by one parameter at a time");
        }
        if (petId != null) {
            return petEventRepository.findByPetId(petId, pageable);
        }
        if (eventType != null) {
            return petEventRepository.findByType(eventType, pageable);
        }
        if (description != null && !description.isBlank()) {
            return petEventRepository.findByDescriptionContainingIgnoreCase(description, pageable);
        }
        return petEventRepository.findAll(pageable);
    }
}
