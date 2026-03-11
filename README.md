# REMITK Pet Registry

## Project Overview

REMITK Pet Registry is a prototype application for registering pets, managing pet owners and tracking the lifecycle of animals.

The goal of the project is to build a minimal but structured registry system that supports:

- pet registration
- owner management
- microchip validation
- lifecycle event tracking
- ownership transfer workflow
- basic search functionality

The system is implemented using a modern full-stack architecture.

Backend: Spring Boot  
Frontend: Angular  
Database: PostgreSQL  
Database migrations: Flyway


--------------------------------------------------

## Architecture

The system follows a typical three-layer architecture.

Angular Frontend  
↓  
Spring Boot REST API  
↓  
PostgreSQL Database


### Frontend

Angular application responsible for:

- user interface
- forms and views
- displaying registry data
- communicating with backend REST API


### Backend

Spring Boot application responsible for:

- business logic
- REST API
- validation
- Flyway database migrations
- database access


### Database

PostgreSQL database stores:

- pet owners
- pets
- microchips
- lifecycle events
- ownership transfer requests


--------------------------------------------------

## Technology Stack

### Backend

Java 21 (Temurin / OpenJDK)  
Spring Boot 3.x  
Maven 3.9+  
PostgreSQL 15+  
Flyway migrations

Build command:

mvn clean verify


### Frontend

Angular  
Node.js 20 LTS  
npm 10+  
Angular CLI

Run frontend:

npm install  
ng serve


--------------------------------------------------

## Repository Structure

backend/        Spring Boot REST API  
frontend/       Angular application  
docs/           Architecture and project documentation  


--------------------------------------------------

## Running the Project

### Start Backend

cd backend  
mvn spring-boot:run

Backend API:

http://localhost:8080


### Start Frontend

cd frontend  
npm install  
ng serve

Frontend:

http://localhost:4200


--------------------------------------------------

## Database Schema

Database schema is managed using Flyway migrations.

Migration location:

backend/src/main/resources/db/migration/V1__init_schema.sql

The schema includes:

- primary keys
- foreign keys
- unique constraints
- microchip status validation
- CHECK constraints


--------------------------------------------------

## Database Tables

The initial schema contains the following tables:

owners  
microchips  
pets  
pet_events  
owner_transfer_requests


--------------------------------------------------

## ER Relationship Overview

owners
   |
   | (1:N)
   |
pets -------- microchips
   |
   | (1:N)
   |
pet_events

pets
   |
   | (1:N)
   |
owner_transfer_requests


--------------------------------------------------

## Table Descriptions

### owners

Stores pet owner information.

Fields:

id – BIGSERIAL PRIMARY KEY  
personal_code – VARCHAR(20), NOT NULL, UNIQUE  
first_name – VARCHAR(100), NOT NULL  
last_name – VARCHAR(100), NOT NULL  
address – VARCHAR(255)  
email – VARCHAR(255)  
phone – VARCHAR(50)  
created_at – TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
updated_at – TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

Notes:

personal_code must be unique because each person should exist only once in the registry.

email is not unique because family members may share the same email address and test data may contain duplicates.


--------------------------------------------------

### microchips

Stores microchip registry data.

Fields:

id – BIGSERIAL PRIMARY KEY  
chip_number – VARCHAR(50), NOT NULL, UNIQUE  
importer – VARCHAR(255), NOT NULL  
status – VARCHAR(20), NOT NULL  
created_at – TIMESTAMP  
updated_at – TIMESTAMP  

Allowed values for status:

FREE  
USED  

VARCHAR + CHECK constraint is used instead of PostgreSQL ENUM to simplify Flyway migrations and allow easier schema changes during early development.


--------------------------------------------------

### pets

Stores registered animal information.

Fields:

id – BIGSERIAL PRIMARY KEY  
microchip_id – BIGINT NOT NULL UNIQUE  
owner_id – BIGINT NULL  
species – VARCHAR(20) NOT NULL  
name – VARCHAR(100) NULL  
sex – VARCHAR(10) NOT NULL  
birth_date – DATE  
breed – VARCHAR(100)  
color – VARCHAR(100)  
image_url – VARCHAR(500)  
status – VARCHAR(30) DEFAULT 'ACTIVE'  
created_at – TIMESTAMP  
updated_at – TIMESTAMP  


Allowed species:

DOG  
CAT  
RABBIT  

Allowed sex values:

MALE  
FEMALE  
UNKNOWN  

Allowed status values:

ACTIVE  
MISSING  
DECEASED  
ABROAD  


Notes:

owner_id may be NULL when the pet does not yet have a confirmed owner.

name may also be NULL when the animal name is unknown.


Example frontend logic:

If name is NULL, the UI may display:

Found animal


--------------------------------------------------

### pet_events

Stores lifecycle history of pets.

Fields:

id – BIGSERIAL PRIMARY KEY  
pet_id – BIGINT NOT NULL  
event_type – VARCHAR(50) NOT NULL  
event_timestamp – TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
performed_by_role – VARCHAR(50) NOT NULL  
description – TEXT  
metadata – TEXT  
created_at – TIMESTAMP  


Example event types:

REGISTERED  
OWNER_ASSIGNED  
OWNER_TRANSFER_INITIATED  
OWNER_TRANSFER_COMPLETED  
OWNER_TRANSFER_REJECTED  
MARKED_MISSING  
MARKED_FOUND  
DECEASED  
EXPORTED  


Example roles:

VET  
VET_ASSISTANT  
OWNER  
SHELTER  
ADMIN  


metadata is stored as TEXT in version 1 to keep the schema simple.  
Future versions may migrate this field to JSONB.


--------------------------------------------------

### owner_transfer_requests

Handles ownership transfer workflow.

Fields:

id – BIGSERIAL PRIMARY KEY  
pet_id – BIGINT NOT NULL  
current_owner_id – BIGINT NOT NULL  
new_owner_id – BIGINT NOT NULL  
status – VARCHAR(20) NOT NULL  
initiated_at – TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
resolved_at – TIMESTAMP  
response_message – TEXT  
created_at – TIMESTAMP  


Allowed status values:

PENDING  
ACCEPTED  
REJECTED  
CANCELLED  


Two owner references are used:

current_owner_id  
new_owner_id  

This clearly defines who transfers the pet and who receives it.


--------------------------------------------------

## Foreign Key Relationships

pets.microchip_id → microchips.id  
pets.owner_id → owners.id  
pet_events.pet_id → pets.id  
owner_transfer_requests.pet_id → pets.id  
owner_transfer_requests.current_owner_id → owners.id  
owner_transfer_requests.new_owner_id → owners.id  


--------------------------------------------------

## Constraint Summary

Unique constraints:

owners.personal_code  
microchips.chip_number  
pets.microchip_id  


CHECK constraints:


microchips.status  
FREE  
USED  


pets.species  
DOG  
CAT  
RABBIT


pets.sex  
MALE  
FEMALE  
UNKNOWN  


pets.status  
ACTIVE  
MISSING  
DECEASED  
ABROAD  


owner_transfer_requests.status  
PENDING  
ACCEPTED  
REJECTED  
CANCELLED  


--------------------------------------------------

## Project Scope (MVP)

The first version focuses only on the core assignment requirements:

- pet registration
- owner management
- microchip validation
- lifecycle events
- basic search

The design intentionally avoids over-engineering in the initial version.


--------------------------------------------------

## Future Improvements

Possible future improvements include:

- Swagger / OpenAPI documentation
- authentication and authorization
- Docker environment
- advanced search
- structured event metadata (JSONB)
- shelter system integration


--------------------------------------------------

## Team Note

If anyone encounters issues with the development setup, please notify the team so the environment can be aligned quickly.