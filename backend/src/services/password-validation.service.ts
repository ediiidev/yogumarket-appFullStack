export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_BYTES = 72;

export function validatePassword(password: string): void {
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`,
    );
  }

  const passwordBytes = Buffer.byteLength(password, "utf8");

  if (passwordBytes > PASSWORD_MAX_BYTES) {
    throw new Error(`Password must not exceed ${PASSWORD_MAX_BYTES} bytes`);
  }
}
