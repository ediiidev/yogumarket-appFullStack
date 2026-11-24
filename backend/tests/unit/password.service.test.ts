import { describe, expect, it } from "vitest";

import {
  hashPassword,
  verifyPassword,
} from "../../src/services/password.service.js";

describe("password.service", () => {
  it("should generate a hash from a valid password", async () => {
    const password = "MySecurePassword123";

    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$2[aby]\$12\$/);
  });

  it("should verify a correct password", async () => {
    const password = "MySecurePassword123";
    const hash = await hashPassword(password);

    const result = await verifyPassword(password, hash);

    expect(result).toBe(true);
  });

  it("should reject an incorrect password", async () => {
    const password = "MySecurePassword123";
    const hash = await hashPassword(password);

    const result = await verifyPassword("AnotherPassword123", hash);

    expect(result).toBe(false);
  });

  it("should generate different hashes for the same password", async () => {
    const password = "MySecurePassword123";

    const firstHash = await hashPassword(password);
    const secondHash = await hashPassword(password);

    expect(firstHash).not.toBe(secondHash);

    expect(await verifyPassword(password, firstHash)).toBe(true);
    expect(await verifyPassword(password, secondHash)).toBe(true);
  });
});
