package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

import java.util.List;


@Entity
@Table(name = "owners")
public class Owner {
    @Id
    @NotNull
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "personal_code", nullable = false, length = 20, unique = true)
    private String personalCode;

    @NotNull
    @Size(max = 100)
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @NotNull
    @Size(max = 100)
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Size(max = 255)
    @Column(name = "address", length = 255)
    private String address;

    @Size(max = 255)
    @Column(name = "email", length = 255)
    private String email;

    @Size(max = 50)
    @Column(name = "phone", length = 50)
    private String phone;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "owner_id")
    private List<Pet> pets;
}
