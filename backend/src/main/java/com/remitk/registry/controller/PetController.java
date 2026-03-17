package com.remitk.registry.controller;

import com.remitk.registry.dto.RegisterPetRequest;
import com.remitk.registry.service.PetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.remitk.registry.model.Pet;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    public ResponseEntity<Pet> registerPet(@Valid @RequestBody RegisterPetRequest request)
            throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.registerPet(request));
    }
}