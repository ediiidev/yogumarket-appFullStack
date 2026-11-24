import { describe, expect, it } from "vitest";

import { registerSchema } from "../../src/schemas/auth.schema.js";

describe("registerSchema", () => {
  it("should accept valid registration data", () => {
    const validData = {
      firstName: "María",
      lastName: "González",
      email: "maria@example.com",
      phone: "+584121234567",
      password: "MiClaveSegura123",
    };

    const result = registerSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });
});

it("should reject an empty first name", () => {
  const result = registerSchema.safeParse({
    firstName: "   ",
    lastName: "González",
    email: "maria@example.com",
    phone: "+584121234567",
    password: "MiClaveSegura123",
  });

  expect(result.success).toBe(false);
});

it("should reject an invalid email", () => {
  const result = registerSchema.safeParse({
    firstName: "María",
    lastName: "González",
    email: "correo-invalido",
    phone: "+584121234567",
    password: "MiClaveSegura123",
  });

  expect(result.success).toBe(false);
});

it("should normalize email to lowercase", () => {
  const result = registerSchema.safeParse({
    firstName: "María",
    lastName: "González",
    email: "MARIA@EXAMPLE.COM",
    phone: "+584121234567",
    password: "MiClaveSegura123",
  });

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.data.email).toBe("maria@example.com");
  }
});

it("should reject an unauthorized role field", () => {
  const result = registerSchema.safeParse({
    firstName: "María",
    lastName: "González",
    email: "maria@example.com",
    phone: "+584121234567",
    password: "MiClaveSegura123",
    role: "ADMIN",
  });

  expect(result.success).toBe(false);
});
