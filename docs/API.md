# Pets Registry API

REST API for managing **pets, owners, microchips, pet events, and images**.

**Version:** `0.1.0`

---

# Table of Contents

- [Authentication](#authentication)
- [Pets](#pets)
  - [`POST /api/pets`](#create-pet)
  - [`GET /api/pets`](#search-pets)
  - [`GET /api/pets/{id}`](#view-pet)
  - [`PUT /api/pets/{id}`](#edit-pet)
  - [`DELETE /api/pets/{id}`](#delete-pet)
- [Pet Images](#pet-images)
  - [`PUT /api/pets/{id}/image`](#upload-image)
  - [`GET /api/pets/{id}/image`](#get-image)
  - [`DELETE /api/pets/{id}/image`](#delete-image)
- [Pet Events](#pet-events)
  - [`POST /api/events`](#create-event)
  - [`GET /api/events`](#search-pet-events)
  - [`GET /api/events/{eventId}`](#view-pet-event)
- [Pet Ownership](#pet-ownership)
  - [`POST /api/pets/{id}/owner`](#set-owner)
  - [`POST /api/pets/{id}/transfer`](#initiate-ownership-transfer)
  - [`POST /api/transfers/{id}/accept`<br>
    `POST /api/transfers/{id}/reject` <br>
    `POST /api/transfers/{id}/cancel`](#complete-ownership-transfer)
- [Owners](#owners)
  - [`POST /api/owners`](#create-owner)
  - [`GET /api/owners`](#search-owners)
  - [`GET /api/owners/{id}`](#view-owner)
  - [`PUT /api/owners/{id}`](#edit-owner)
  - [`DELETE /api/owners/{id}`](#delete-owner)
  - [`GET /api/owners/{id}/pets`](#get-owner-pets)
- [Microchips](#microchips)
  - [`POST /api/microchips`](#create-microchip)
  - [`GET /api/microchips`](#search-microchips)
  - [`GET /api/microchips/{id}`](#view-microchip)
  - [`PUT /api/microchips/{id}/status`](#edit-microchip-status)
  - [`DELETE /api/microchips/{id}`](#delete-microchip)

## Implementation plans
All endpoints are divided into the core API and future plans.
### Core API

- [Pets](#pets)
  - [`POST /api/pets`](#create-pet)
  - [`GET /api/pets`](#search-pets)
  - [`GET /api/pets/{id}`](#view-pet)
  - [`PUT /api/pets/{id}`](#edit-pet)
  - [`DELETE /api/pets/{id}`](#delete-pet)
- [Owners](#owners)
  - [`POST /api/owners`](#create-owner)
  - [`GET /api/owners`](#search-owners)
  - [`GET /api/owners/{id}`](#view-owner)
  - [`PUT /api/owners/{id}`](#edit-owner)
  - [`GET /api/owners/{id}/pets`](#get-owner-pets)
- [Microchips](#microchips)
  - [`POST /api/microchips`](#create-microchip)
  - [`GET /api/microchips`](#search-microchips)
  - [`PUT /api/microchips/{id}/status`](#edit-microchip-status)
- [Pet Ownership](#pet-ownership)
  - [`POST /api/pets/{id}/transfer`](#initiate-ownership-transfer)
  - [`POST /api/transfers/{id}/accept`<br>
    `POST /api/transfers/{id}/reject` <br>
    `POST /api/transfers/{id}/cancel`](#complete-ownership-transfer)

### Future extensions

- [Owners](#owners)
  - [`DELETE /api/owners/{id}`](#delete-owner)
- [Microchips](#microchips)
  - [`GET /api/microchips/{id}`](#view-microchip)
  - [`DELETE /api/microchips/{id}`](#delete-microchip)
- [Pet Images](#pet-images)
  - [`PUT /api/pets/{id}/image`](#upload-image)
  - [`GET /api/pets/{id}/image`](#get-image)
  - [`DELETE /api/pets/{id}/image`](#delete-image)
- [Pet Events](#pet-events)
  - [`POST /api/events`](#create-event)
  - [`GET /api/events`](#search-pet-events)
  - [`GET /api/events/{eventId}`](#view-pet-event)
  - [`POST /api/pets/{id}/owner`](#set-owner)
---

# Authentication

All endpoints require **HTTP Basic Authentication**.

```http
Authorization: Basic <base64(username:password)>
```

Example:

```bash
curl -u username:password {baseUrl}/api/pets
```

---

# Pets

## Pet entity

This is the core pet entity, returned by all endpoints that return a pet.

### Fields

| Name        | Description                        | Nullable | Directly modifiable | Example                                         |
|-------------|------------------------------------|----------|---------------------|-------------------------------------------------|
| id          | Pet's ID, primary key              | No       | No                  | `39999`                                         |
| microchipId | The ID of the pet's microchip      | No       | Yes                 | `473278223`                                     |
| species     | The pet's species                  | No       | Yes                 | `"DOG"`                                         |
| name        | The pet's name                     | Yes      | Yes                 | `"Pauka"`                                       |
| sex         | The pet's sex                      | No       | Yes                 | `"MALE"`                                        |
| birthDate   | The pet's birth date in ISO format | Yes      | Yes                 | `"2026-02-02"`                                  |
| breed       | The pet's breed                    | Yes      | Yes                 | `"Kuldne retriiver"`                            |
| color       | The pet's color                    | Yes      | Yes                 | `"punane"`                                      |
| imageUrl    | The pet's image URL                | Yes      | No                  | `"https://petregistry.ee/images/32738dnm.jpeg"` |
| ownerId     | The ID of the pet's owner          | Yes      | No                  | `3729789`                                       |


## Create Pet
### (Core API)

`POST /api/pets`

Creates a new pet entity.
User must be a veterinarian.

### Request Body

A pet object, with directly modifiable fields.

#### Required fields:

- species
- sex

#### Example:

```json
{
  "microchipId": 783278492,
  "species": "CAT",
  "name": "Miisu",
  "sex": "FEMALE",
  "birthDate": "2025-02-02",
  "breed": "lühikarvaline",
  "color": "must"
}
```

### Success

| Code | Description                        |
|------|------------------------------------|
| 201  | Returns the **created pet object** |

### Errors

| Code | Description                                |
|------|--------------------------------------------|
| 400  | Invalid request body or validation failure |
| 401  | Authentication required                    |
| 403  | Insufficient permissions                   |
| 500  | Internal server error                      |

---

## Search Pets
### (Core API)

`GET /api/pets`

Search pets by **microchipId**, **name**, or **ownerId**.  
Exactly **one filter must be provided**. Returns only pets visible to the user. 

### Query Parameters

| Parameter   | Type    | Default | Description         |
|-------------|---------|---------|---------------------|
| microchipId | integer | -       | Filter by microchip |
| name        | string  | -       | Filter by pet name  |
| ownerId     | integer | -       | Filter by owner     |
| page        | integer | 0       | Page number         |
| size        | integer | 10      | Page size           |
| sortBy      | string  | -       | Sort field          |

### Success

| Code | Description                                                                                                                      |
|------|----------------------------------------------------------------------------------------------------------------------------------|
| 200  | Returns a **paginated JSON list of [pet objects](#pet-entity)** matching the search criteria, or an empty list if none is found. |



### Errors

| Code | Description                                           |
|------|-------------------------------------------------------|
| 400  | Invalid query parameters or multiple filters provided |
| 401  | Authentication required                               |
| 403  | Insufficient permissions                              |
| 500  | Internal server error                                 |

---

## View Pet
### (Core API)

`GET /api/pets/{id}`

Returns details of a specific pet.
Requires user role to be able to see pet.

### Path Parameters

| Parameter | Type    |
|-----------|---------|
| id        | integer |

### Success

| Code | Description                                                                            |
|------|----------------------------------------------------------------------------------------|
| 200  | Returns the **pet object** including microchip reference, species, owner, and metadata |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet not found            |
| 500  | Internal server error    |

---

## Edit Pet
### (Core API)

`PUT /api/pets/{id}`

Updates an existing pet entity.
Only available for veterinarians and admins.

### Request Body

A pet object, with directly modifiable fields.

#### Required fields:

- microchipId
- species
- sex

#### Example:

```json
{
  "microchipId": 783278492,
  "species": "CAT",
  "name": "Miisu",
  "sex": "FEMALE",
  "birthDate": "2025-02-02",
  "breed": "lühikarvaline",
  "color": "must"
}
```

### Success

| Code | Description                        |
|------|------------------------------------|
| 200  | Returns the **updated pet object** |

### Errors

| Code | Description                      |
|------|----------------------------------|
| 400  | Validation error in request body |
| 401  | Authentication required          |
| 403  | Insufficient permissions         |
| 404  | Pet not found                    |
| 500  | Internal server error            |

---

## Delete Pet
### (Core API)

`DELETE /api/pets/{id}`

Deletes a pet entity.
Only available for admin role.

### Success

| Code | Description                                |
|------|--------------------------------------------|
| 204  | Pet successfully deleted, no response body |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet not found            |
| 500  | Internal server error    |

---

# Pet Images

## Upload Image

`PUT /api/pets/{id}/image`

Uploads a **JPEG image** associated with a pet.

### Request

Binary JPEG file.

### Success

| Code      | Description                                                                               |
|-----------|-------------------------------------------------------------------------------------------|
| 200 / 201 | Returns a **imageUrl field in the response body pointing to the uploaded image resource** |

### Errors

| Code | Description                     |
|------|---------------------------------|
| 400  | Invalid image format or request |
| 401  | Authentication required         |
| 403  | Insufficient permissions        |
| 404  | Pet not found                   |
| 500  | Internal server error           |

---

## Get Image

`GET /api/pets/{id}/image`

Retrieves a link to the image associated with the pet.

### Success

| Code | Description                                                                 |
|------|-----------------------------------------------------------------------------|
| 200  | Returns a **imageUrl field in the response body pointing to the stored pet image** |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet or image not found   |
| 500  | Internal server error    |

---

## Delete Image

`DELETE /api/pets/{id}/image`

Deletes the stored pet image.

### Success

| Code | Description                |
|------|----------------------------|
| 204  | Image deleted successfully |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet or image not found   |
| 500  | Internal server error    |

---

# Pet Events

## Pet event entity

The pet event entity, immutable.

| Name            | Description                                           | Nullable | Example                 |
|-----------------|-------------------------------------------------------|----------|-------------------------|
| id              | The ID of the pet event                               | No       | `76767`                 |
| petId           | The ID of the pet associated with the pet event       | No       | `565655`                |
| type            | The type of the pet event                             | No       | `"MARKED_FOUND"`        |
| time            | The time the pet event was recorded in UTC ISO format | No       | `"2026-02-02T12:45:56"` |
| performedByRole | The role of the user the pet was recorded by          | No       | `"VET"`                 |
| description     | A description of what happened                        | Yes      | `"Leitud kraavist"`     |


## Create Event

`POST /api/events`

Creates a new event related to the pet (for example missing, found, transferred).

### Request Body

Contains information about the event. Description and time are optional.

#### Example:
```json
{
  "petId": 32832,
  "type": "MARKED_MISSING",
  "description": "",
  "time": "2025-11-13T14:28:39"
}
```

### Success

| Code | Description                               |
|------|-------------------------------------------|
| 201  | Returns the **created pet event object**  |

### Errors

| Code | Description              |
|------|--------------------------|
| 400  | Invalid event data       |
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet not found            |
| 500  | Internal server error    |

---

## Search Pet Events

`GET /api/events`

Search pet events by **PetId**, **eventType** or **description**.  
Exactly one search filter must be provided.
Only events of pets that the user is allowed to access are presented.

### Query Parameters

| Parameter   | Type    | Default |
|-------------|---------|---------|
| petId       | integer | -       |
| eventType   | string  | -       |
| description | string  | -       |
| page        | integer | 0       |
| size        | integer | 10      |
| sortBy      | string  | -       |

### Success

| Code | Description                                                                           |
|------|---------------------------------------------------------------------------------------|
| 200  | Returns a **paginated JSON list of [pet event objects](#pet-event-entity)** or an empty list if not found. |

### Errors

| Code | Description               |
|------|---------------------------|
| 400  | Invalid search parameters |
| 401  | Authentication required   |
| 403  | Insufficient permissions  |
| 500  | Internal server error     |

---

## View Pet Event

`GET /api/events/{eventId}`

Returns details of a specific pet event.
Only events of pets that the user is allowed to access are presented.

### Success

| Code | Description                      |
|------|----------------------------------|
| 200  | Returns the **pet event object** |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Event not found          |
| 500  | Internal server error    |

---

# Pet Ownership

## Set Owner

`POST /api/pets/{id}/owner`

Assigns an owner to a pet **only if the pet currently has no owner**.

### Request Body

Body must contain an ownerId of the new owner.

```json
{
  "ownerId": 2343244
}
```

### Success

| Code | Description                 |
|------|-----------------------------|
| 204  | Owner successfully assigned |

### Errors

| Code | Description              |
|------|--------------------------|
| 400  | Pet already has an owner |
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet or owner not found   |
| 500  | Internal server error    |

---

## Ownership transfer entity

An entity to record ownership transfers.

### Fields

| Name            | Description                                                                         | Nullable | Example                                         |
|-----------------|-------------------------------------------------------------------------------------|----------|-------------------------------------------------|
| id              | The ID of the ownership transfer                                                    | No       | `73283`                                         |
| petId           | The ID of the pet transferred                                                       | No       | `67676`                                         |
| currentOwnerId  | The ID of the current (previous) owner of the pet                                   | No       | `32672`                                         |
| newOwnerId      | The ID of the new owner of the pet                                                  | No       | `32132`                                         |
| status          | The status of the transfer, whether it is pending, cancelled, accepted, or rejected | No       | `"ACCEPTED"`                                    |
| initiatedAt     | The time the transfer was initiated at, ISO datetime                                | No       | `"2025-12-31T23:59:59"`                         |
| resolvedAt      | The time the transfer was resolved (accepted, rejected), ISO datetime               | Yes      | `"2026-01-01T00:00:01"`                         |
| responseMessage | The message given when responding to transfer request                               | Yes      | `"Omanik muudetud, ootab transporti uude koju"` |


---

## Initiate Ownership Transfer
### (Core API)

`POST /api/pets/{id}/transfer`

Initiates a transfer of pet ownership to another owner.
Can only be done by the current owner of the pet.

### Request Body

The body must contain the ID of the new owner.

```json
{
  "newOwnerId": 32312321
}
```

### Success

| Code | Description                             |
|------|-----------------------------------------|
| 201  | The resulting ownership transfer entity |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Pet or owner not found   |
| 500  | Internal server error    |

---

## Complete Ownership Transfer
### (Core API)

`POST /api/transfers/{id}/accept`

**or**

`POST /api/transfers/{id}/reject`

Accepts or rejects a pending ownership transfer request.
Can only be done by the specified new owner.

**or**

`POST /api/transfers/{id}/cancel`

Cancels the ongoing ownership transfer request.
Can only be done by the current owner.

### Request Body

Empty body.

### Success

| Code | Description                    |
|------|--------------------------------|
| 200  | The resulting transfer object  |

### Errors

| Code | Description               |
|------|---------------------------|
| 400  | Invalid transfer state    |
| 401  | Authentication required   |
| 403  | Insufficient permissions  |
| 404  | Transfer or pet not found |
| 500  | Internal server error     |

---

# Owners

## Owner entity

An entity to record the information of a pet owner.

### Fields

| Name         | Description                       | Nullable | Example                                      |
|--------------|-----------------------------------|----------|----------------------------------------------|
| id           | The ID of the owner               | No       | `32878`                                      |
| personalCode | The personal ID code of the owner | No       | `"39912121234"`                              |
| firstName    | The first name(s) of the owner    | No       | `"Jaan Madis"`                               |
| lastName     | The surname(s) of the owner       | No       | `"Tamm"`                                     |
| address      | The physical address of the owner | Yes      | `"Koera 12, Tallinn, Harju maakond, Eesti"`  |
| email        | The e-mail address of the owner   | Yes      | `"jaantamm@gmail.com"`                       |
| phone        | The phone number of the owner     | Yes      | `"+37254541010"`                             |


## Create Owner
### (Core API)

`POST /api/owners`

Creates a new owner entity.
Can only be done by an admin.

### Request Body

Required fields:
- **personalCode**
- **firstName**
- **lastName**

#### Example:
```json
{
  "personalCode": "399020428347",
  "firstName": "Jaan",
  "lastName": "Tamm",
  "address": "Koera tn 18, Tallinn, Harju maakond, Eesti",
  "email": "jaan.tamm@gmail.com",
  "phone": "+37254541010"
}
```

### Success

| Code | Description                          |
|------|--------------------------------------|
| 201  | Returns the **created owner object** |

### Errors

| Code | Description                              |
|------|------------------------------------------|
| 400  | Invalid request body or validation error |
| 401  | Authentication required                  |
| 403  | Insufficient permissions                 |
| 500  | Internal server error                    |

---

## Search Owners
### (Core API)

`GET /api/owners`

Search for owners by **name** or **personalCode**.  
Exactly **one of the parameters must be provided**.
The user must have access to the owner.

### Query Parameters

| Parameter    | Type    | Description                               |
|--------------|---------|-------------------------------------------|
| personalCode | string  | Search by national personal code          |
| name         | string  | Search by owner name (first or last name) |
| page         | integer | Page index                                |
| size         | integer | Page size                                 |
| sortBy       | string  | Field used for sorting                    |

### Success

| Code | Description                                                                                                    |
|------|----------------------------------------------------------------------------------------------------------------|
| 200  | Returns a **paginated JSON list of [owner objects](#owner-entity)** matching the search criteria or an empty list if not found. |

### Errors

| Code | Description                                       |
|------|---------------------------------------------------|
| 400  | Invalid query parameters or both filters provided |
| 401  | Authentication required                           |
| 403  | Insufficient permissions                          |
| 500  | Internal server error                             |

---

## View Owner
### (Core API)

`GET /api/owners/{id}`

Returns details for a specific owner.

### Path Parameters

| Parameter | Type    |
|-----------|---------|
| id        | integer |

### Success

| Code | Description                                                                      |
|------|----------------------------------------------------------------------------------|
| 200  | Returns the **owner object**, including personal details and contact information |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Owner not found          |
| 500  | Internal server error    |

---

## Edit Owner
### (Core API)

`PUT /api/owners/{id}`

Updates an existing owner entity. Only available for admin users.

### Request Body

Required fields:
- **personalCode**
- **firstName**
- **lastName**

#### Example:

```json
{
  "personalCode": "399020428347",
  "firstName": "Jaan",
  "lastName": "Tamm",
  "address": "Koera tn 18, Tallinn, Harju maakond, Eesti",
  "email": "jaan.tamm@gmail.com",
  "phone": "+37254541010"
}
```

### Success

| Code | Description                          |
|------|--------------------------------------|
| 200  | Returns the **updated owner object** |

### Errors

| Code | Description                      |
|------|----------------------------------|
| 400  | Validation error in request body |
| 401  | Authentication required          |
| 403  | Insufficient permissions         |
| 404  | Owner not found                  |
| 500  | Internal server error            |

---

## Delete Owner

`DELETE /api/owners/{id}`

Deletes an owner entity. Only available for admin users.

### Success

| Code | Description                                           |
|------|-------------------------------------------------------|
| 204  | Owner successfully deleted. No response body returned |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Owner not found          |
| 500  | Internal server error    |

---

## Get Owner Pets
### (Core API)

`GET /api/owners/{id}/pets`

Returns pets belonging to a specific owner, paginated.
Only available for users that have access to that owner.

### Path Parameters

| Parameter | Type    |
|-----------|---------|
| id        | integer |

### Query Parameters

| Parameter | Type    | Description   |
|-----------|---------|---------------|
| page      | integer | Page index    |
| size      | integer | Page size     |
| sortBy    | string  | Sorting field |

### Success

| Code | Description                                                              |
|------|--------------------------------------------------------------------------|
| 200  | Returns a **paginated list of pet objects owned by the specified owner** |

### Errors

| Code | Description              |
|------|--------------------------|
| 400  | Invalid query parameters |
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Owner not found          |
| 500  | Internal server error    |

---

# Microchips

## Microchip entity

Entity for storing the data of a microchip.

### Fields:

None of the fields are nullable.

| Name       | Description                        | Example            |
|------------|------------------------------------|--------------------|
| id         | The ID of the microchip object     | `32783`            |
| chipNumber | The number of the chip             | `"43784673"`       |
| importer   | The importer of the chip           | `"Loomakiibid OÜ"` |
| status     | Whether the chip is free or in use | `"FREE"`, `"USED"` |


## Create Microchip
### (Core API)

`POST /api/microchips`

Creates a new microchip entity. Only available for admin users.

### Request Body

The fields in the example are required. A new microchip will always have a status of "FREE".

#### Example:
```json
{
  "chipNumber": "433847324",
  "importer": "Loomakliinik OÜ"
}
```

### Success

| Code | Description                              |
|------|------------------------------------------|
| 201  | Returns the **created microchip object** |

### Errors

| Code | Description                              |
|------|------------------------------------------|
| 400  | Invalid request body or validation error |
| 401  | Authentication required                  |
| 403  | Insufficient permissions                 |
| 500  | Internal server error                    |

---

## Search Microchips
### (Core API)

`GET /api/microchips`

Search microchips by **chipNumber** or **importer**.  
Exactly **one filter must be provided**. Only available for admin users.

### Query Parameters

| Parameter  | Type    | Description                     |
|------------|---------|---------------------------------|
| chipNumber | string  | Search by chip number           |
| importer   | string  | Search by importer organization |
| page       | integer | Page index                      |
| size       | integer | Page size                       |
| sortBy     | string  | Sorting field                   |

### Success

| Code | Description                                                                                                        |
|------|--------------------------------------------------------------------------------------------------------------------|
| 200  | Returns a **paginated JSON list of [microchip objects](#microchip-entity)** matching the search criteria or an empty list if not found. |

### Errors

| Code | Description                                            |
|------|--------------------------------------------------------|
| 400  | Invalid search parameters or multiple filters provided |
| 401  | Authentication required                                |
| 403  | Insufficient permissions                               |
| 404  | No microchips found                                    |
| 500  | Internal server error                                  |

---

## View Microchip

`GET /api/microchips/{id}`

Returns details of a specific microchip.

### Path Parameters

| Parameter | Type    |
|-----------|---------|
| id        | integer |

### Success

| Code | Description                      |
|------|----------------------------------|
| 200  | Returns the **microchip object** |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Microchip not found      |
| 500  | Internal server error    |

---

## Edit Microchip Status
### (Core API)

`PUT /api/microchips/{id}/status`

Updates a microchip entity. Only available for admin users. 

### Request Body

A status is required.

#### Example:

```json
{
  "status": "USED"
}
```

### Success

| Code | Description                              |
|------|------------------------------------------|
| 200  | Returns the **updated microchip object** |

### Errors

| Code | Description                      |
|------|----------------------------------|
| 400  | Validation error in request body |
| 401  | Authentication required          |
| 403  | Insufficient permissions         |
| 404  | Microchip not found              |
| 500  | Internal server error            |

---

## Delete Microchip

`DELETE /api/microchips/{id}`

Deletes a microchip entity. Only available for admin users.

### Success

| Code | Description                                               |
|------|-----------------------------------------------------------|
| 204  | Microchip successfully deleted. No response body returned |

### Errors

| Code | Description              |
|------|--------------------------|
| 401  | Authentication required  |
| 403  | Insufficient permissions |
| 404  | Microchip not found      |
| 500  | Internal server error    |
