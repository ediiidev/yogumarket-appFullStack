import { describe, expect, it } from "vitest";

import { validatePassword } from "../../src/services/password-validation.service.js";

describe("validatePassword", () => {
  it("should accept a password with 12 characters", () => {
    expect(() => validatePassword("Abcdef123456")).not.toThrow();
  });

  it("should reject a password shorter than 12 characters", () => {
    expect(() => validatePassword("Short123")).toThrow();
  });

  it("should reject a password exceeding 72 bytes", () => {
    const password = "a".repeat(73);

    expect(() => validatePassword(password)).toThrow();
  });

  it("should accept a password with exactly 72 bytes", () => {
    const password = "a".repeat(72);

    expect(() => validatePassword(password)).not.toThrow();
  });

  it("should count UTF-8 bytes instead of characters", () => {
    const password = "a".repeat(12) + "😀".repeat(16);

    expect(password.length).toBe(44);
    expect(Buffer.byteLength(password, "utf8")).toBe(76);

    expect(() => validatePassword(password)).toThrow();
  });
});
