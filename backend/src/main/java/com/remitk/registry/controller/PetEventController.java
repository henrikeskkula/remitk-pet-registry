package com.remitk.registry.controller;

import com.remitk.registry.dto.PetEventDTO;
import com.remitk.registry.dto.PetEventListDTO;
import com.remitk.registry.dto.PetEventMapper;
import com.remitk.registry.dto.PetEventSortableFields;
import com.remitk.registry.model.PetEvent;
import com.remitk.registry.model.PetEventType;
import com.remitk.registry.service.PetEventService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PetEventController {

    private final PetEventService petEventService;

    public PetEventController(PetEventService petEventService) {
        this.petEventService = petEventService;
    }

    @PostMapping("/api/events")
    public ResponseEntity<PetEventDTO> createPetEvent(@RequestBody @Valid PetEventDTO petEventDTO) throws ResourceNotFoundException {
        petEventDTO.setId(null);
        // Placeholder for role, will be set by the security context
        petEventDTO.setPerformedByRole(null);
        PetEvent petEvent = PetEventMapper.toPetEvent(petEventDTO);
        PetEvent createdPetEvent = petEventService.createPetEvent(petEvent);
        return ResponseEntity.status(HttpStatus.CREATED).body(PetEventMapper.toPetEventDTO(createdPetEvent));
    }

    @GetMapping("/api/events")
    public ResponseEntity<PetEventListDTO> getPetEvents(@RequestParam(required = false) Long petId,
                                                        @RequestParam(required = false) PetEventType eventType,
                                                        @RequestParam(required = false) String description,
                                                        @RequestParam(defaultValue = "0") Integer page,
                                                        @RequestParam(defaultValue = "10") Integer size,
                                                        @RequestParam(defaultValue = "id") PetEventSortableFields sortBy,
                                                        @RequestParam(defaultValue = "asc") String direction) throws BadRequestException {
        Pageable pageable = getPageable(page, size, sortBy.name(), direction);
        Page<PetEventDTO> petEventDTOs = petEventService.searchPetEvents(petId, eventType, description, pageable).map(PetEventMapper::toPetEventDTO);
        PetEventListDTO petEventListDTO = new PetEventListDTO(
                petEventDTOs.getContent(),
                petEventDTOs.getNumber(),
                petEventDTOs.getSize(),
                petEventDTOs.getTotalPages(),
                petEventDTOs.getTotalElements(),
                sortBy.name(),
                direction.toLowerCase()
        );
        return ResponseEntity.ok(petEventListDTO);
    }

    private Pageable getPageable(Integer page, Integer size, String sortBy, String direction) throws BadRequestException {
        Pageable pageable;
        if (page < 0) {
            throw new BadRequestException("Invalid page parameter, should not be negative");
        }
        else if (size <= 0) {
            throw new BadRequestException("Invalid size parameter, should be positive");
        }
        if (direction.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        }
        else if (direction.equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }
        else {
            throw new BadRequestException("Invalid sort direction, should be 'asc' or 'desc'");
        }
        return pageable;
    }
}
