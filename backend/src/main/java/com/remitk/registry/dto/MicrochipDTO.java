package com.remitk.registry.dto;

import com.remitk.registry.model.MicrochipStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MicrochipDTO {
    private final Long id;
    @NotNull
    @Size(max = 50)
    private final String chipNumber;
    @NotNull
    @Size(max = 255)
    private final String importer;
    @NotNull
    private final MicrochipStatus status;

    public MicrochipDTO(Long id, String chipNumber, String importer, MicrochipStatus status) {
        this.id = id;
        this.chipNumber = chipNumber;
        this.importer = importer;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getChipNumber() {
        return chipNumber;
    }

    public String getImporter() {
        return importer;
    }

    public MicrochipStatus getStatus() {
        return status;
    }
}
