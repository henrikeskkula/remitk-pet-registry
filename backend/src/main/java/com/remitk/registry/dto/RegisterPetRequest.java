package com.remitk.registry.dto;

import com.remitk.registry.model.PetSex;
import com.remitk.registry.model.PetSpecies;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterPetRequest {

    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    private Long microchipId;

    @NotNull
    private Long ownerId;

    @NotNull
    private PetSpecies species;

    @NotNull
    private PetSex sex;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMicrochipId() {
        return microchipId;
    }

    public void setMicrochipId(Long microchipId) {
        this.microchipId = microchipId;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public PetSpecies getSpecies() {
        return species;
    }

    public void setSpecies(PetSpecies species) {
        this.species = species;
    }

    public PetSex getSex() {
        return sex;
    }

    public void setSex(PetSex sex) {
        this.sex = sex;
    }
}