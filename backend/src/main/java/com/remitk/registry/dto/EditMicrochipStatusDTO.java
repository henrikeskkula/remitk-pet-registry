package com.remitk.registry.dto;

import com.remitk.registry.model.MicrochipStatus;
import jakarta.validation.constraints.NotNull;

public class EditMicrochipStatusDTO {
    @NotNull
    private final MicrochipStatus status;
    public EditMicrochipStatusDTO(MicrochipStatus status) {
        this.status = status;
    }
    public MicrochipStatus getStatus() {
        return status;
    }
}
