package com.remitk.registry.dto;

import com.remitk.registry.model.PetEventType;
import com.remitk.registry.model.UserRole;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class PetEventDTO {
    private Long id;

    @NotNull
    private Long petId;

    @NotNull
    private PetEventType type;

    @NotNull
    private LocalDateTime time;

    private String description;

    private UserRole performedByRole;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }

    public PetEventType getType() {
        return type;
    }

    public void setType(PetEventType type) {
        this.type = type;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserRole getPerformedByRole() {
        return performedByRole;
    }

    public void setPerformedByRole(UserRole performedByRole) {
        this.performedByRole = performedByRole;
    }
}
