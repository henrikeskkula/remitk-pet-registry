# Pets Registry API

REST API for managing **pets, owners, microchips, pet events, and images**.

**Version:** `0.1.0`

---

# Table of Contents

- [Authentication](#authentication)
- [Pets](#pets)
    - [Create Pet](#create-pet)
    - [Search Pets](#search-pets)
    - [View Pet](#view-pet)
    - [Edit Pet](#edit-pet)
    - [Delete Pet](#delete-pet)
- [Pet Images](#pet-images)
- [Pet Events](#pet-events)
- [Pet Ownership](#pet-ownership)
- [Owners](#owners)
- [Microchips](#microchips)

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

## Create Pet

`POST /api/pets`

Creates a new pet entity.

### Request Body

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

| Code | Description |
|---|---|
| 201 | Returns the **created pet object**, including its generated `id`, metadata, and provided fields |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid request body or validation failure |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 500 | Internal server error |

---

## Search Pets

`GET /api/pets`

Search pets by **microchipId**, **name**, or **ownerId**.  
Exactly **one filter must be provided**.

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| microchipId | integer | - | Filter by microchip |
| name | string | - | Filter by pet name |
| ownerId | integer | - | Filter by owner |
| page | integer | 0 | Page number |
| size | integer | 10 | Page size |
| sortBy | string | - | Sort field |

### Success

| Code | Description |
|---|---|
| 200 | Returns a **paginated list of pet objects** matching the search criteria |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid query parameters or multiple filters provided |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | No pets found |
| 500 | Internal server error |

---

## View Pet

`GET /api/pets/{id}`

Returns details of a specific pet.

### Path Parameters

| Parameter | Type |
|---|---|
| id | integer |

### Success

| Code | Description |
|---|---|
| 200 | Returns the **pet object** including microchip reference, species, owner, and metadata |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

## Edit Pet

`PUT /api/pets/{id}`

Updates an existing pet entity.

### Required Fields

- `species`
- `sex`

### Request Body

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

| Code | Description |
|---|---|
| 200 | Returns the **updated pet object** |

### Errors

| Code | Description |
|---|---|
| 400 | Validation error in request body |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

## Delete Pet

`DELETE /api/pets/{id}`

Deletes a pet entity.

### Success

| Code | Description |
|---|---|
| 204 | Pet successfully deleted, no response body |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

# Pet Images

## Upload Image

`PUTp /api/pets/{id}/image`

Uploads a **JPEG image** associated with a pet.

### Request

Binary JPEG file.

### Success

| Code | Description |
|---|---|
| 200 / 201 | Returns a **URL or link pointing to the uploaded image resource** |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid image format or request |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

## Get Image

`GET /api/pets/{id}/image`

Retrieves the image associated with the pet.

### Success

| Code | Description |
|---|---|
| 200 | Returns a **URL or reference to the stored pet image** |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet or image not found |
| 500 | Internal server error |

---

## Delete Image

`DELETE /api/pets/{id}/image`

Deletes the stored pet image.

### Success

| Code | Description |
|---|---|
| 204 | Image deleted successfully |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet or image not found |
| 500 | Internal server error |

---

# Pet Events

## Create Event

`POST /api/pets/{id}/events`

Creates a new event related to the pet (for example missing, found, transferred).

### Request Body

```json
{
  "eventType": "MARKED_MISSING",
  "description": ""
}
```

### Success

| Code | Description |
|---|---|
| 201 | Returns the **created pet event object**, including its `eventId`, type, description, and timestamps |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid event data |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

## Search Pet Events

`GET /api/pets/{id}/events`

Search pet events by **eventType** or **description**.  
Exactly one search filter must be provided.

### Query Parameters

| Parameter | Type | Default |
|---|---|---|
| eventType | string | - |
| description | string | - |
| page | integer | 0 |
| size | integer | 10 |
| sortBy | string | - |

### Success

| Code | Description |
|---|---|
| 200 | Returns a **paginated list of pet event objects** |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid search parameters |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet not found |
| 500 | Internal server error |

---

## View Pet Event

`GET /api/pets/{petId}/events/{eventId}`

Returns details of a specific pet event.

### Success

| Code | Description |
|---|---|
| 200 | Returns the **pet event object** |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Event not found |
| 500 | Internal server error |

---

## Edit Pet Event

`PUT /api/pets/{petId}/events/{eventId}`

Updates a pet event.

### Request Body

```json
{
  "eventType": "MARKED_MISSING",
  "description": ""
}
```

### Success

| Code | Description |
|---|---|
| 200 | Returns the **updated pet event object** |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid request body |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Event not found |
| 500 | Internal server error |

---

## Delete Pet Event

`DELETE /api/pets/{petId}/events/{eventId}`

Deletes a pet event.

### Success

| Code | Description |
|---|---|
| 204 | Event deleted successfully |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Event not found |
| 500 | Internal server error |

---

# Pet Ownership

## Set Owner

`POST /api/pets/{id}/owner`

Assigns an owner to a pet **only if the pet currently has no owner**.

### Request Body

```json
{
  "ownerId": 2343244
}
```

### Success

| Code | Description |
|---|---|
| 204 | Owner successfully assigned |

### Errors

| Code | Description |
|---|---|
| 400 | Pet already has an owner |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet or owner not found |
| 500 | Internal server error |

---

## Initiate Ownership Transfer

`POST /api/pets/{id}/initiateTransfer`

Initiates a transfer of pet ownership to another owner.

### Request Body

```json
{
  "newOwnerId": 32312321
}
```

### Success

| Code | Description |
|---|---|
| 204 | Transfer process successfully initiated |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Pet or owner not found |
| 500 | Internal server error |

---

## Complete Ownership Transfer

`POST /api/pets/{id}/endTransfer`

Accepts or rejects a pending ownership transfer request.

### Request Body

```json
{
  "acceptTransfer": true
}
```

### Success

| Code | Description |
|---|---|
| 204 | Transfer completed or declined successfully |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid transfer state |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Transfer or pet not found |
| 500 | Internal server error |

---

# Owners

## Create Owner

`POST /api/owners`

Creates a new owner entity.

### Request Body

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

| Code | Description |
|---|---|
| 201 | Returns the **created owner object**, including its generated `id`, personal information, and contact details |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid request body or validation error |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 500 | Internal server error |

---

## Search Owners

`GET /api/owners`

Search for owners by **name** or **personalCode**.  
Exactly **one of the parameters must be provided**.

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| personalCode | string | Search by national personal code |
| name | string | Search by owner name (first or last name) |
| page | integer | Page index |
| size | integer | Page size |
| sortBy | string | Field used for sorting |

### Success

| Code | Description |
|---|---|
| 200 | Returns a **paginated list of owner objects** matching the search criteria |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid query parameters or both filters provided |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | No owners found |
| 500 | Internal server error |

---

## View Owner

`GET /api/owners/{id}`

Returns details for a specific owner.

### Path Parameters

| Parameter | Type |
|---|---|
| id | integer |

### Success

| Code | Description |
|---|---|
| 200 | Returns the **owner object**, including personal details and contact information |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Owner not found |
| 500 | Internal server error |

---

## Edit Owner

`PUT /api/owners/{id}`

Updates an existing owner entity.

### Request Body

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

| Code | Description |
|---|---|
| 200 | Returns the **updated owner object** with the modified fields |

### Errors

| Code | Description |
|---|---|
| 400 | Validation error in request body |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Owner not found |
| 500 | Internal server error |

---

## Delete Owner

`DELETE /api/owners/{id}`

Deletes an owner entity.

### Success

| Code | Description |
|---|---|
| 204 | Owner successfully deleted. No response body returned |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Owner not found |
| 500 | Internal server error |

---

## Get Owner Pets

`GET /api/owners/{id}/pets`

Returns all pets belonging to a specific owner.

### Path Parameters

| Parameter | Type |
|---|---|
| id | integer |

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| page | integer | Page index |
| size | integer | Page size |
| sortBy | string | Sorting field |

### Success

| Code | Description |
|---|---|
| 200 | Returns a **paginated list of pet objects owned by the specified owner** |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid query parameters |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Owner not found |
| 500 | Internal server error |

---

# Microchips

## Create Microchip

`POST /api/microchips`

Creates a new microchip entity.

### Request Body

```json
{
  "chipNumber": "433847324",
  "importer": "Loomakliinik OÜ"
}
```

### Success

| Code | Description |
|---|---|
| 201 | Returns the **created microchip object**, including its generated `id`, chip number, and importer |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid request body or validation error |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 500 | Internal server error |

---

## Search Microchips

`GET /api/microchips`

Search microchips by **chipNumber** or **importer**.  
Exactly **one filter must be provided**.

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| chipNumber | string | Search by chip number |
| importer | string | Search by importer organization |
| page | integer | Page index |
| size | integer | Page size |
| sortBy | string | Sorting field |

### Success

| Code | Description |
|---|---|
| 200 | Returns a **paginated list of microchip objects** matching the search criteria |

### Errors

| Code | Description |
|---|---|
| 400 | Invalid search parameters or multiple filters provided |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | No microchips found |
| 500 | Internal server error |

---

## View Microchip

`GET /api/microchips/{id}`

Returns details of a specific microchip.

### Path Parameters

| Parameter | Type |
|---|---|
| id | integer |

### Success

| Code | Description |
|---|---|
| 200 | Returns the **microchip object**, including chip number and importer information |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Microchip not found |
| 500 | Internal server error |

---

## Edit Microchip

`PUT /api/microchips/{id}`

Updates a microchip entity.

### Request Body

```json
{
  "chipNumber": "433847324",
  "importer": "Loomakliinik OÜ"
}
```

### Success

| Code | Description |
|---|---|
| 200 | Returns the **updated microchip object** |

### Errors

| Code | Description |
|---|---|
| 400 | Validation error in request body |
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Microchip not found |
| 500 | Internal server error |

---

## Delete Microchip

`DELETE /api/microchips/{id}`

Deletes a microchip entity.

### Success

| Code | Description |
|---|---|
| 204 | Microchip successfully deleted. No response body returned |

### Errors

| Code | Description |
|---|---|
| 401 | Authentication required |
| 403 | Insufficient permissions |
| 404 | Microchip not found |
| 500 | Internal server error |