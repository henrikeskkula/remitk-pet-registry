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

    private Long ownerId;

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

    public Long getId() {
        return id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMicrochipId(Long microchipId) {
        this.microchipId = microchipId;
    }

    public void setSpecies(PetSpecies species) {
        this.species = species;
    }

    public void setSex(PetSex sex) {
        this.sex = sex;
    }

    public void setStatus(PetStatus status) {
        this.status = status;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}