package com.remitk.registry.dto;

import com.remitk.registry.model.MicrochipStatus;
import jakarta.validation.constraints.NotNull;

public class EditMicrochipStatusDTO {
    @NotNull
    private MicrochipStatus status;
    public EditMicrochipStatusDTO(MicrochipStatus status) {
        this.status = status;
    }
    public EditMicrochipStatusDTO() {}
    public MicrochipStatus getStatus() {
        return status;
    }
    public void setStatus(MicrochipStatus status) {
        this.status = status;
    }
}
