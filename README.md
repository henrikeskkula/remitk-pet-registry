# remitk-pet-registry

## Project Overview

REMITK Pet Registry is a web application prototype designed for registering pets, managing pet owners, and tracking lifecycle events of pets.

The system allows users to:

* register pets with a microchip number
* manage pet owners
* validate microchip availability
* track pet lifecycle events
* handle pet ownership transfers
* perform basic searches

The goal of the project is to demonstrate a structured backend, a clear database schema, and a frontend interface for interacting with the registry.

---

## Technologies

### Backend

* Java 21
* Spring Boot 3.x
* Maven

### Frontend

* Angular
* Node.js 20 LTS
* npm

### Database

* PostgreSQL

### Database migrations

* Flyway

---

## Repository Structure

```
backend/        Spring Boot REST API
frontend/       Angular application
docs/           Project documentation
```

Flyway migration files are located in:

```
backend/src/main/resources/db/migration
```

---

## Running the Application

### Backend

```
cd backend
mvn spring-boot:run
```

Backend API runs at:

```
http://localhost:8080
```

---

### Frontend

```
cd frontend
npm install
ng serve
```

Frontend runs at:

```
http://localhost:4200
```

---

## User Roles

The system supports several user roles:

* **ADMIN** – full system access
* **VET** – can register pets and record lifecycle events
* **VET_ASSISTANT** – limited veterinary actions
* **OWNER** – can view their pets and respond to ownership transfer requests
* **SHELTER** – can manage stray or found animals

---

## Core Features

* Pet registration
* Pet owner management
* Microchip validation
* Pet lifecycle event tracking
* Ownership transfer requests
* Search functionality

---

## Database Overview

The database schema includes the following main tables:

* `owners`
* `microchips`
* `pets`
* `pet_events`
* `owner_transfer_requests`

### Important Design Decisions

* Microchip numbers are unique.
* Owner personal codes are unique.
* Pet names may be **NULL** to support cases where a found animal's name is unknown.
* Detailed lifecycle history is stored in the **pet_events** table.
* Microchip status determines whether a chip is available or already used.

---

## API

The backend follows REST principles.

Example endpoints:

### Pets

```
POST /api/pets
GET /api/pets
GET /api/pets/{id}
PUT /api/pets/{id}
DELETE /api/pets/{id}
GET /api/pets/{id}/events
```

### Owners

```
POST /api/owners
GET /api/owners
GET /api/owners/{id}
PUT /api/owners/{id}
GET /api/owners/{id}/pets
```

### Microchips

```
POST /api/microchips
GET /api/microchips
```

### Ownership Transfers

```
POST /api/transfers
POST /api/transfers/{id}/accept
POST /api/transfers/{id}/reject
```

### Search

```
GET /api/pets?microchipNumber=
GET /api/pets?name=
GET /api/owners?personalCode=
GET /api/owners?name=
```

---

## Architecture Overview

The application follows a typical three-layer architecture:

```
Frontend (Angular)
        ↓
REST API (Spring Boot)
        ↓
Database (PostgreSQL)
```

Flyway is used to manage database schema migrations.

---

## Future Improvements

Possible future improvements include:

* Swagger / OpenAPI documentation
* Authentication and authorization
* Docker-based development environment
* Data export (CSV, JSON, PDF)
* Email notifications
* Advanced filtering and sorting
