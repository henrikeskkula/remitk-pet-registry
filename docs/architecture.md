# REMITK Pet Registry - Architecture

## Goal
Prototype web app to register pets, manage owners, microchips and immutable lifecycle events.
Tech: Spring Boot (BE), Angular (FE), PostgreSQL (DB), Flyway migrations.

## Roles
- ADMIN: manage microchips, full access
- VETERINARIAN: register pets, update pet data, mark death/export
- SHELTER: manage stray/shelter flows
- OWNER: view own pets, initiate/confirm owner transfer

## High-level
Angular -> REST API -> Spring Boot (service layer) -> PostgreSQL

## Core domain entities
### Owner
- personalCode (unique), name, address, email, phone

### Microchip
- chipNumber (PK), importer, status: FREE|USED

### Pet
- microchipNumber (unique), species, name, gender, birthDate, breed, color, imageUrl, ownerId (nullable)

### PetEvent (immutable)
Every lifecycle change writes an event row (append-only).
Fields: petId, type, time, performedByRole, payload/description.

### OwnerTransferRequest
Two-step confirmation:
- old owner initiates
- new owner accepts/rejects
status: PENDING|ACCEPTED|REJECTED

## Database tables (minimum)
- owners
- microchips
- pets
- pet_events
- owner_transfer_requests
- shelter_records (optional for bonus)

## Key business rules
1) Pet registration requires:
   - microchip exists in microchips table
   - microchip status == FREE
   - microchip number unique in pets
   - on success: set microchip status -> USED and write REGISTERED event

2) Events are immutable:
   - no update/delete on pet_events (only insert)

3) Owner transfer:
   - old owner creates transfer request -> event OWNER_TRANSFER_STARTED
   - new owner accepts -> pet.owner_id updated -> event OWNER_TRANSFER_ACCEPTED
   - reject -> event OWNER_TRANSFER_REJECTED

## REST API (core)
### Pets
- POST /api/pets (VET) register pet
- GET  /api/pets/{id}
- GET  /api/pets/by-chip/{chip}
- PUT  /api/pets/{id} (VET/ADMIN)
- DELETE /api/pets/{id} (ADMIN)

### Owners
- POST /api/owners (ADMIN)
- GET  /api/owners/{id}
- PUT  /api/owners/{id} (ADMIN)
- GET  /api/owners/{id}/pets

### Microchips
- POST /api/microchips (ADMIN)
- GET  /api/microchips (ADMIN)
- PUT  /api/microchips/{chip}/status (ADMIN)

### Search (role-filtered)
- GET /api/search/pets?chip=&name=&owner=
- GET /api/search/owners?personalCode=&name=

### Transfers
- POST /api/pets/{id}/transfer (OWNER: old owner)
- POST /api/transfers/{id}/accept (OWNER: new owner)
- POST /api/transfers/{id}/reject (OWNER: new owner)

## Non-functional
- Validation: Bean Validation + DB constraints
- Flyway for schema
- Swagger/OpenAPI (bonus)
- Docker compose (bonus)