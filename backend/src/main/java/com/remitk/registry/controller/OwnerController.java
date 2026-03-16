package com.remitk.registry.controller;

import com.remitk.registry.dto.OwnerDTO;
import com.remitk.registry.dto.PetDTO;
import com.remitk.registry.model.Owner;
import com.remitk.registry.service.OwnerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OwnerController {
    @Autowired
    private OwnerService ownerService;

    @PostMapping("/api/owners")
    public ResponseEntity<OwnerDTO> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) {
        Owner createdOwner = ownerService.createOwner(ownerDTO.toOwner());
        return ResponseEntity.status(201).body(OwnerDTO.fromOwner(createdOwner));
    }

    @GetMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> getOwnerById(@PathVariable Long id) throws ResourceNotFoundException {
        Owner owner = ownerService.getOwnerById(id);
        return ResponseEntity.ok(OwnerDTO.fromOwner(owner));
    }

    @PutMapping("/api/owners/{id}")
    public ResponseEntity<OwnerDTO> editOwnerById(@PathVariable Long id, @Valid @RequestBody OwnerDTO ownerDTO) throws ResourceNotFoundException {
        ownerDTO.setId(id);
        Owner editedOwner = ownerService.editOwner(ownerDTO.toOwner());
        return ResponseEntity.ok(OwnerDTO.fromOwner(editedOwner));
    }

    @GetMapping("/api/owners/{id}/pets")
    public ResponseEntity<List<PetDTO>> getPetsByOwnerId(@PathVariable Long id) throws ResourceNotFoundException {
        List<PetDTO> ownerPetDTOs = ownerService.getPetsByOwnerId(id)
                .stream()
                .map(PetDTO::fromPet)
                .toList();
        return ResponseEntity.ok(ownerPetDTOs);
    }
}
