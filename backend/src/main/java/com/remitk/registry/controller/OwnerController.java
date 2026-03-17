package com.remitk.registry.controller;

import com.remitk.registry.dto.*;
import com.remitk.registry.model.Owner;
import com.remitk.registry.service.OwnerService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class OwnerController {
    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/api/owners")
    public ResponseEntity<OwnerDTO> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) throws BadRequestException {
        ownerDTO.setId(null);
        Owner createdOwner = ownerService.createOwner(OwnerMapper.toOwner(ownerDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(OwnerMapper.toOwnerDTO(createdOwner));
    }

    @GetMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> getOwnerById(@PathVariable Long id) throws ResourceNotFoundException {
        Owner owner = ownerService.getOwnerById(id);
        return ResponseEntity.ok(OwnerMapper.toOwnerDTO(owner));
    }

    @PutMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> editOwnerById(@PathVariable Long id, @Valid @RequestBody OwnerDTO ownerDTO)
            throws ResourceNotFoundException, BadRequestException {
        if (ownerDTO.getId() != null && !Objects.equals(id, ownerDTO.getId())) {
            throw new BadRequestException("ID in path and body must match");
        }
        ownerDTO.setId(id);
        Owner editedOwner = ownerService.editOwner(OwnerMapper.toOwner(ownerDTO));
        return ResponseEntity.ok(OwnerMapper.toOwnerDTO(editedOwner));
    }

    @GetMapping("/api/owners/{id}/pets")
    public ResponseEntity<PetListDTO> getPetsByOwnerId(@PathVariable Long id,
                                                       @RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "10") Integer size,
                                                       @RequestParam(defaultValue = "id") PetSortableFields sortBy,
                                                       @RequestParam(defaultValue = "asc") String direction)
            throws ResourceNotFoundException, BadRequestException {

        Pageable pageable;
        if (page < 0) {
            throw new BadRequestException("Invalid page parameter, should not be negative");
        }
        else if (size <= 0) {
            throw new BadRequestException("Invalid size parameter, should be positive");
        }
        if (direction.equalsIgnoreCase("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy.name()).ascending());
        }
        else if (direction.equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy.name()).descending());
        }
        else {
            throw new BadRequestException("Invalid sort direction, should be 'asc' or 'desc'");
        }
        Page<PetDTO> ownerPetDTOs = ownerService.getPetsByOwnerId(id, pageable).map(PetMapper::toPetDTO);
        PetListDTO petListDTO = new PetListDTO(ownerPetDTOs.getContent(),
                ownerPetDTOs.getNumber(),
                ownerPetDTOs.getSize(),
                ownerPetDTOs.getTotalPages(),
                ownerPetDTOs.getTotalElements(),
                sortBy.name(),
                direction.toLowerCase());
        return ResponseEntity.ok(petListDTO);
    }
}
