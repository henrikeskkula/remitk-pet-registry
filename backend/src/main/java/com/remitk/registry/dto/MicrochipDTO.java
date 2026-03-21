package com.remitk.registry.dto;

import com.remitk.registry.model.MicrochipStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MicrochipDTO {
    private Long id;
    @NotNull
    @Size(max = 50)
    private String chipNumber;
    @NotNull
    @Size(max = 255)
    private String importer;
    @NotNull
    private MicrochipStatus status;

    public MicrochipDTO(Long id, String chipNumber, String importer, MicrochipStatus status) {
        this.id = id;
        this.chipNumber = chipNumber;
        this.importer = importer;
        this.status = status;
    }

    public MicrochipDTO() {}

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setChipNumber(String chipNumber) {
        this.chipNumber = chipNumber;
    }

    public void setImporter(String importer) {
        this.importer = importer;
    }

    public void setStatus(MicrochipStatus status) {
        this.status = status;
    }
}
