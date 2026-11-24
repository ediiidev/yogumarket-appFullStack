
BEGIN;

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(30) NOT NULL UNIQUE,

    description VARCHAR(150),

    CONSTRAINT roles_name_allowed
        CHECK (
            name IN (
                'CLIENT',
                'ADMIN',
                'OPERATOR',
                'DELIVERER'
            )
        )
);

INSERT INTO roles (name, description)
VALUES
    ('CLIENT', 'Usuario que realiza pedidos'),
    ('ADMIN', 'Administrador del sistema'),
    ('OPERATOR', 'Responsable de operaciones y pagos'),
    ('DELIVERER', 'Responsable de las entregas');

COMMIT;
