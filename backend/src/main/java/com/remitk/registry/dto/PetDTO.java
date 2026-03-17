package com.remitk.registry.dto;

import com.remitk.registry.model.PetSex;
import com.remitk.registry.model.PetSpecies;
import com.remitk.registry.model.PetStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class PetDTO {

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

    @Size(max = 500)
    private String imageUrl;

    private Long ownerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMicrochipId() {
        return microchipId;
    }

    public void setMicrochipId(Long microchipId) {
        this.microchipId = microchipId;
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

    public PetStatus getStatus() {
        return status;
    }

    public void setStatus(PetStatus status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}
