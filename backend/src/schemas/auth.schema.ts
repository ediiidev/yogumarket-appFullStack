import { z } from "zod";
import { validatePassword } from "../services/password-validation.service.js";

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),

    lastName: z.string().trim().min(1).max(100),

    email: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .email()
      .transform((email) => email.toLowerCase()),

    phone: z.string().trim().min(1).max(30),

    password: z.string().superRefine((password, context) => {
      try {
        validatePassword(password);
      } catch (error) {
        context.addIssue({
          code: "custom",
          message: error instanceof Error ? error.message : "Invalid password",
        });
      }
    }),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
