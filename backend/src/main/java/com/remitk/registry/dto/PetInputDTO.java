package com.remitk.registry.dto;

import com.remitk.registry.model.PetSex;
import com.remitk.registry.model.PetSpecies;
import com.remitk.registry.model.PetStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class PetInputDTO {
    private Long id;

    @NotNull
    private Long microchipId;

    @NotNull
    private PetSpecies species;

    @NotNull
    private PetSex sex;

    @NotNull
    private PetStatus status;

    @Size(max = 100)
    private String name;

    private LocalDate birthDate;

    @Size(max = 100)
    private String breed;

    @Size(max = 100)
    private String color;

    public Long getMicrochipId() {
        return microchipId;
    }

    public PetSpecies getSpecies() {
        return species;
    }

    public PetSex getSex() {
        return sex;
    }

    public PetStatus getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getBreed() {
        return breed;
    }

    public String getColor() {
        return color;
    }
}