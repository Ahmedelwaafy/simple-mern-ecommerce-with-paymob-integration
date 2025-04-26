import { z } from "zod";
import { TFunction } from "i18next";

// Reusable email schema
export const emailSchema = (t: TFunction) =>
  z
    .string()
    .min(1, { message: t("validations.email.required") })
    .email({ message: t("validations.email.pattern") });

// Reusable password schema
export const passwordSchema = (t: TFunction) =>
  z
    .string()
    .min(8, { message: t("validations.password.minLength") })
    .regex(/[a-zA-Z]/, { message: t("validations.password.letter") })
    .regex(/\d/, { message: t("validations.password.number") })
    .regex(/[^a-zA-Z\d]/, { message: t("validations.password.specialChar") });

// Signup schema
export const signUpSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(3, { message: t("validations.name.minLength") }),
    email: emailSchema(t),
    password: passwordSchema(t),
  });

// Signin schema
export const signInSchema = (t: TFunction) =>
  z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
    remember_me: z.boolean().optional(),
  });

// Generate form types from Zod validation schemas
export type signUpType = z.infer<ReturnType<typeof signUpSchema>>;
export type signInType = z.infer<ReturnType<typeof signInSchema>>;
