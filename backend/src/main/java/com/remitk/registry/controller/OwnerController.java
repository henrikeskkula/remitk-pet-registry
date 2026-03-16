package com.remitk.registry.controller;

import com.remitk.registry.dto.OwnerDTO;
import com.remitk.registry.model.Owner;
import com.remitk.registry.service.OwnerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OwnerController {
    @Autowired
    private OwnerService ownerService;

    @PostMapping("/api/owners")
    public ResponseEntity<Owner> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) {
        Owner createdOwner = ownerService.createOwner(ownerDTO.toOwner());
        return ResponseEntity.status(201).body(createdOwner);
    }

    @GetMapping("/api/owners/{id}")
    public ResponseEntity<Owner> getOwnerById(@PathVariable Long id) throws ResourceNotFoundException {
        Owner owner = ownerService.getOwnerById(id);
        return ResponseEntity.ok(owner);
    }

    @PutMapping("/api/owners/{id}")
    public ResponseEntity<Owner> editOwnerById(@PathVariable Long id, @Valid @RequestBody OwnerDTO ownerDTO) throws ResourceNotFoundException {
        ownerDTO.setId(id);
        Owner editedOwner = ownerService.editOwner(ownerDTO.toOwner());
        return ResponseEntity.ok(editedOwner);
    }
}
