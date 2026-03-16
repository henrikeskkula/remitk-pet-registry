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

    // Functions for transforming the DTO to entity and vice versa
    public Owner toOwner() {
        Owner owner;
        if (id == null) {
            owner = new Owner(this.personalCode, this.firstName, this.lastName);
        }
        else {
            owner = new Owner(id, this.personalCode, this.firstName, this.lastName);
        }
        owner.setAddress(this.address);
        owner.setEmail(this.email);
        owner.setPhone(this.phone);
        return owner;
    }

    public static OwnerDTO fromOwner(Owner owner) {
        OwnerDTO dto = new OwnerDTO();
        dto.id = owner.getId();
        dto.personalCode = owner.getPersonalCode();
        dto.firstName = owner.getFirstName();
        dto.lastName = owner.getLastName();
        dto.address = owner.getAddress();
        dto.email = owner.getEmail();
        dto.phone = owner.getPhone();
        return dto;
    }

    // Getters and setters
    public void setId(Long id) {
        this.id = id;
    }
}
