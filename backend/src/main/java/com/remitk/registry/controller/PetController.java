package com.remitk.registry.controller;

import com.remitk.registry.dto.*;
import com.remitk.registry.service.PetService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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


    @GetMapping
    public ResponseEntity<PetListDTO> searchPets(@RequestParam(required = false) String name,
                                                 @RequestParam(required = false) Long microchipId,
                                                 @RequestParam(required = false) Long ownerId,
                                                 @RequestParam(defaultValue = "0") Integer page,
                                                 @RequestParam(defaultValue = "10") Integer size,
                                                 @RequestParam(defaultValue = "id") PetSortableFields sortBy,
                                                 @RequestParam(defaultValue = "asc") String direction) throws BadRequestException {
        Pageable pageable = getPageable(page, size, sortBy.name(), direction);
        Page<PetDTO> petDTOs = petService.searchPets(name, microchipId, ownerId, pageable).map(PetMapper::toPetDTO);
        PetListDTO petListDTO = new PetListDTO(petDTOs.getContent(),
                petDTOs.getNumber(),
                petDTOs.getSize(),
                petDTOs.getTotalPages(),
                petDTOs.getTotalElements(),
                sortBy.name(),
                direction.toLowerCase());
        return ResponseEntity.ok(petListDTO);
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