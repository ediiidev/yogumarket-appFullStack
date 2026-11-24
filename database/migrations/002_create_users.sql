
BEGIN;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    role_id UUID NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    email_verified_at TIMESTAMPTZ,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_fk
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,

    CONSTRAINT users_first_name_not_empty
        CHECK (LENGTH(TRIM(first_name)) > 0),

    CONSTRAINT users_last_name_not_empty
        CHECK (LENGTH(TRIM(last_name)) > 0),

    CONSTRAINT users_email_not_empty
        CHECK (LENGTH(TRIM(email)) > 0),

    CONSTRAINT users_phone_not_empty
        CHECK (LENGTH(TRIM(phone)) > 0)
);

CREATE UNIQUE INDEX users_email_unique
    ON users (LOWER(TRIM(email)));

COMMIT;
