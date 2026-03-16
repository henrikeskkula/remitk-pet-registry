package com.remitk.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
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
    @Email
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

    @OneToMany(mappedBy = "owner")
    private List<Pet> pets;

    // Constructor for JPA
    protected Owner() {}

    // Constructor for initial creation of entity
    public Owner(String personalCode, String firstName, String lastName) {
        this.personalCode = personalCode;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Constructor for updating an existing owner
    public Owner(Long id, String personalCode, String firstName, String lastName) {
        this.id = id;
        this.personalCode = personalCode;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // ID-only constructor for referencing an owner in other entities
    public Owner(Long id) {
        this.id = id;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getPersonalCode() {
        return personalCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<Pet> getPets() {
        return pets;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
