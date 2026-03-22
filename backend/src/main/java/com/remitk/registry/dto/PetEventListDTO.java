package com.remitk.registry.dto;

import java.util.List;

public class PetEventListDTO {
    private final List<PetEventDTO> items;
    private final int page;
    private final int size;
    private final int totalPages;
    private final long totalElements;
    private final String sortBy;
    private final String direction;

    public PetEventListDTO(List<PetEventDTO> items, int page, int size, int totalPages, long totalElements, String sortBy, String direction) {
        this.items = items;
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.sortBy = sortBy;
        this.direction = direction;
    }

    public List<PetEventDTO> getItems() {
        return items;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public String getSortBy() {
        return sortBy;
    }

    public String getDirection() {
        return direction;
    }
}
