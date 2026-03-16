package com.remitk.registry.controller;

import com.remitk.registry.dto.OwnerDTO;
import com.remitk.registry.dto.OwnerMapper;
import com.remitk.registry.dto.PetDTO;
import com.remitk.registry.dto.PetMapper;
import com.remitk.registry.model.Owner;
import com.remitk.registry.service.OwnerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class OwnerController {
    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/api/owners")
    public ResponseEntity<OwnerDTO> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) {
        Owner createdOwner = ownerService.createOwner(OwnerMapper.toOwner(ownerDTO));
        return ResponseEntity.status(201).body(OwnerMapper.toOwnerDTO(createdOwner));
    }

    @GetMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> getOwnerById(@PathVariable Long id) throws ResourceNotFoundException {
        Owner owner = ownerService.getOwnerById(id);
        return ResponseEntity.ok(OwnerMapper.toOwnerDTO(owner));
    }

    @PutMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> editOwnerById(@PathVariable Long id, @Valid @RequestBody OwnerDTO ownerDTO) throws ResourceNotFoundException {
        if (ownerDTO.getId() != null && !Objects.equals(id, ownerDTO.getId())) {
            throw new IllegalArgumentException("ID in path and body must match");
        }
        ownerDTO.setId(id);
        Owner editedOwner = ownerService.editOwner(OwnerMapper.toOwner(ownerDTO));
        return ResponseEntity.ok(OwnerMapper.toOwnerDTO(editedOwner));
    }

    @GetMapping("/api/owners/{id}/pets")
    public ResponseEntity<List<PetDTO>> getPetsByOwnerId(@PathVariable Long id) throws ResourceNotFoundException {
        List<PetDTO> ownerPetDTOs = ownerService.getPetsByOwnerId(id)
                .stream()
                .map(PetMapper::toPetDTO)
                .toList();
        return ResponseEntity.ok(ownerPetDTOs);
    }
}
