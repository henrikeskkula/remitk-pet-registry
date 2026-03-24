# REMITK Pet Registry

A prototype pet registry system for registering animals, managing owners, microchips, and ownership transfers.

**Stack:** Spring Boot · Angular · PostgreSQL · Flyway

---

## Prerequisites

- Java 21+
- Node.js 20+ and npm
- Docker and Docker Compose

---

## Setup & Running

### 1. Database

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

.env should contain:

```env
POSTGRES_DB=remitk
POSTGRES_USER=remitk
POSTGRES_PASSWORD=<your-password>
```

Start the database:

```bash
docker compose up -d
```

PostgreSQL will be available at `localhost:5432`. Flyway migrations run automatically on backend startup.

---

### 2. Backend

Set the required environment variables (or export them in your shell):

```bash
export DB_URL=jdbc:postgresql://localhost:5432/remitk
export DB_USERNAME=remitk
export DB_PASSWORD=<your-password>
```

Run:

```bash
cd backend
./mvnw spring-boot:run
```

Backend starts at **http://localhost:8080**

---

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend starts at **http://localhost:4200**

---

## Key Endpoints

| Resource | Endpoint |
|---|---|
| List / search pets | `GET /api/pets` |
| Register a pet | `POST /api/pets` |
| Pet details / edit / delete | `GET/PUT/DELETE /api/pets/{id}` |
| List / search owners | `GET /api/owners` |
| Create owner | `POST /api/owners` |
| Owner's pets | `GET /api/owners/{id}/pets` |
| List / search microchips | `GET /api/microchips` |
| Register microchip | `POST /api/microchips` |
| Initiate ownership transfer | `POST /api/pets/{id}/transfer` |
| Accept / reject / cancel transfer | `POST /api/transfers/{id}/accept` · `reject` · `cancel` |
| Pet lifecycle events | `GET /api/events?petId={id}` |

Full API reference: API.md

