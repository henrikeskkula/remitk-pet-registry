-- V1__init_schema.sql
-- Initial schema for REMITK pet registry

CREATE TABLE owners (
    id BIGSERIAL PRIMARY KEY,
    personal_code VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE microchips (
    id BIGSERIAL PRIMARY KEY,
    chip_number VARCHAR(50) NOT NULL UNIQUE,
    importer VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_microchips_status
        CHECK (status IN ('FREE', 'USED'))
);

CREATE TABLE pets (
    id BIGSERIAL PRIMARY KEY,
    microchip_id BIGINT NOT NULL UNIQUE,
    owner_id BIGINT,
    species VARCHAR(20) NOT NULL,
    name VARCHAR(100),
    sex VARCHAR(10),
    birth_date DATE,
    breed VARCHAR(100),
    color VARCHAR(100),
    image_url VARCHAR(500),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pets_microchip
        FOREIGN KEY (microchip_id) REFERENCES microchips(id),

    CONSTRAINT fk_pets_owner
        FOREIGN KEY (owner_id) REFERENCES owners(id),

    CONSTRAINT chk_pets_species
        CHECK (species IN ('DOG', 'CAT', 'FERRET')),

    CONSTRAINT chk_pets_sex
        CHECK (sex IN ('MALE', 'FEMALE', 'UNKNOWN') OR sex IS NULL),

    CONSTRAINT chk_pets_status
        CHECK (status IN ('ACTIVE', 'MISSING', 'FOUND', 'DECEASED', 'ABROAD'))
);

CREATE TABLE pet_events (
    id BIGSERIAL PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    performed_by_role VARCHAR(50) NOT NULL,
    description TEXT,
    metadata TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pet_events_pet
        FOREIGN KEY (pet_id) REFERENCES pets(id),

    CONSTRAINT chk_pet_events_event_type
        CHECK (
            event_type IN (
                'REGISTERED',
                'OWNER_ASSIGNED',
                'OWNER_TRANSFER_INITIATED',
                'OWNER_TRANSFER_COMPLETED',
                'OWNER_TRANSFER_REJECTED',
                'MARKED_MISSING',
                'MARKED_FOUND',
                'DECEASED',
                'EXPORTED'
            )
        ),

    CONSTRAINT chk_pet_events_performed_by_role
        CHECK (
            performed_by_role IN (
                'VET',
                'VET_ASSISTANT',
                'OWNER',
                'SHELTER',
                'ADMIN'
            )
        )
);

CREATE TABLE owner_transfer_requests (
    id BIGSERIAL PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    current_owner_id BIGINT NOT NULL,
    new_owner_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    initiated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    response_message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_owner_transfer_requests_pet
        FOREIGN KEY (pet_id) REFERENCES pets(id),

    CONSTRAINT fk_owner_transfer_requests_current_owner
        FOREIGN KEY (current_owner_id) REFERENCES owners(id),

    CONSTRAINT fk_owner_transfer_requests_new_owner
        FOREIGN KEY (new_owner_id) REFERENCES owners(id),

    CONSTRAINT chk_owner_transfer_requests_status
        CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED')),

    CONSTRAINT chk_owner_transfer_requests_different_owners
        CHECK (current_owner_id <> new_owner_id)
);