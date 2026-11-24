import bcrypt from "bcrypt";

import { validatePassword } from "./password-validation.service.js";

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  validatePassword(password);

  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  validatePassword(password);

  return bcrypt.compare(password, storedHash);
}
