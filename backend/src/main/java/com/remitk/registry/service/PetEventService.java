package com.remitk.registry.service;

import com.remitk.registry.controller.BadRequestException;
import com.remitk.registry.controller.ResourceNotFoundException;
import com.remitk.registry.model.PetEvent;
import com.remitk.registry.model.PetEventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PetEventService {
    PetEvent createPetEvent(PetEvent petEvent) throws ResourceNotFoundException;
    Page<PetEvent> searchPetEvents(Long petId, PetEventType eventType, String description, Pageable pageable) throws BadRequestException;
}
