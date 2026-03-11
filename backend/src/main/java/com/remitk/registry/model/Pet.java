package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Pet {
    @Id
    @NotNull
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "species", nullable = false, length = 20)
    private String species;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @NotNull
    @Size(max = 10)
    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

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
    @Size(max = 30)
    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @OneToOne
    @JoinColumn(name = "microchip_id", nullable = false, unique = true)
    private Microchip microchip;
}
