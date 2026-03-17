package com.remitk.registry.dto;

import java.util.List;

public class PetListDTO {
    public List<PetDTO> pets;
    public int page;
    public int size;
    public int totalPages;
    public long totalElements;
    public String sortBy;
    public String direction;

    public PetListDTO(List<PetDTO> pets, int page, int size, int totalPages, long totalElements, String sortBy, String direction) {
        this.pets = pets;
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.sortBy = sortBy;
        this.direction = direction;
    }
}
