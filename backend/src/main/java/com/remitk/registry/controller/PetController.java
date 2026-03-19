package com.remitk.registry.controller;

import com.remitk.registry.dto.PetDTO;
import com.remitk.registry.dto.PetInputDTO;
import com.remitk.registry.dto.PetMapper;
import com.remitk.registry.service.PetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    public ResponseEntity<PetDTO> registerPet(@Valid @RequestBody PetInputDTO request)
            throws BadRequestException, ResourceNotFoundException {
        PetDTO registeredPetDTO = PetMapper.toPetDTO(petService.registerPet(PetMapper.toPet(request, null)));
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredPetDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(PetMapper.toPetDTO(petService.getPetById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePetById(@PathVariable Long id, @Valid @RequestBody PetInputDTO requestPet)
            throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(PetMapper.toPetDTO(petService.updatePet(id, PetMapper.toPet(requestPet, id))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePetById(@PathVariable Long id) throws ResourceNotFoundException {
        petService.deletePetById(id);
        return ResponseEntity.noContent().build();
    }
}