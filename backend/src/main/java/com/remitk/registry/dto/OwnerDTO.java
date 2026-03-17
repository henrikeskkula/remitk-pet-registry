package com.remitk.registry.dto;

import com.remitk.registry.model.Owner;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class OwnerDTO {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String personalCode;

    @NotNull
    @Size(max = 100)
    private String firstName;

    @NotNull
    @Size(max = 100)
    private String lastName;

    @Size(max = 255)
    private String address;

    @Size(max = 255)
    @Email
    private String email;

    @Size(max = 50)
    private String phone;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonalCode() {
        return personalCode;
    }

    public void setPersonalCode(String personalCode) {
        this.personalCode = personalCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
