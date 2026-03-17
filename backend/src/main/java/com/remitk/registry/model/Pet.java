package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "species", nullable = false, length = 20)
    private PetSpecies species;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sex", nullable = false, length = 10)
    private PetSex sex;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Size(max = 100)
    @Column(name = "breed", length = 100)
    private String breed;

    @Size(max = 100)
    @Column(name = "color", length = 100)
    private String color;

    @Size(max = 500)
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private PetStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "microchip_id", nullable = false, unique = true)
    private Microchip microchip;

    // Constructor for JPA
    protected Pet() {}

    // Constructor for creating entity
    public Pet(PetSpecies species, PetSex sex, Microchip microchip, PetStatus status) {
        this.species = species;
        this.sex = sex;
        this.microchip = microchip;
        this.status = status;
    }

    // Constructor for updating entity
    public Pet(Long id, PetSpecies species, PetSex sex, Microchip microchip, PetStatus status) {
        this.id = id;
        this.species = species;
        this.sex = sex;
        this.microchip = microchip;
        this.status = status;
    }

    // ID-only constructor for referencing a pet in other entities
    public Pet(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public PetSpecies getSpecies() {
        return species;
    }

    public String getName() {
        return name;
    }

    public PetSex getSex() {
        return sex;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public PetStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Owner getOwner() {
        return owner;
    }

    public Microchip getMicrochip() {
        return microchip;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSex(PetSex sex) {
        this.sex = sex;
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

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setStatus(PetStatus status) {
        this.status = status;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public void setMicrochip(Microchip microchip) {
        this.microchip = microchip;
    }
}
