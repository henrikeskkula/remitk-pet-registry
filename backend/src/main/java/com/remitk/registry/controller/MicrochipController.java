package com.remitk.registry.controller;

import com.remitk.registry.dto.*;
import com.remitk.registry.service.MicrochipService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MicrochipController {
    private final MicrochipService microchipService;
    public MicrochipController(MicrochipService microchipService) {
        this.microchipService = microchipService;
    }

    @PostMapping("/api/microchips")
    public ResponseEntity<MicrochipDTO> createMicrochip(@RequestBody @Valid MicrochipDTO microchipDTO) {
        microchipDTO.setId(null);
        MicrochipDTO newMicrochipDTO = MicrochipMapper.toMicrochipDTO(
                microchipService.createMicrochip(MicrochipMapper.toMicrochip(microchipDTO)));
        return ResponseEntity.status(HttpStatus.CREATED).body(newMicrochipDTO);
    }

    @GetMapping("/api/microchips")
    public ResponseEntity<MicrochipListDTO> searchMicrochips(@RequestParam(required = false) String chipNumber,
                                                             @RequestParam(required = false) String importer,
                                                             @RequestParam(defaultValue = "0") Integer page,
                                                             @RequestParam(defaultValue = "10") Integer size,
                                                             @RequestParam(defaultValue = "id") MicrochipSortableFields sortBy,
                                                             @RequestParam(defaultValue = "asc") String direction) throws BadRequestException {
        Pageable pageable = getPageable(page, size, sortBy.name(), direction);
        Page<MicrochipDTO> microchipDTOs = microchipService.searchMicrochips(chipNumber, importer, pageable)
                .map(MicrochipMapper::toMicrochipDTO);
        MicrochipListDTO microchipListDTO = new MicrochipListDTO(microchipDTOs.getContent(),
                microchipDTOs.getNumber(),
                microchipDTOs.getSize(),
                microchipDTOs.getTotalPages(),
                microchipDTOs.getTotalElements(),
                sortBy.name(),
                direction.toLowerCase());
        return ResponseEntity.ok(microchipListDTO);
    }

    @PutMapping("/api/microchips/{id}/status")
    public ResponseEntity<MicrochipDTO> updateMicrochipStatus(@PathVariable Long id, @RequestBody @Valid EditMicrochipStatusDTO statusDTO) throws ResourceNotFoundException {
        MicrochipDTO microchipDTO = MicrochipMapper.toMicrochipDTO(
                microchipService.updateMicrochipStatus(id, statusDTO.getStatus()));
        return ResponseEntity.ok(microchipDTO);
    }

    @DeleteMapping("/api/microchips/{id}")
    public ResponseEntity<Void> deleteMicrochip(@PathVariable Long id) throws ResourceNotFoundException {
        microchipService.deleteMicrochipById(id);
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
