import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    phoneNumber: z.string().refine(isValidPhoneNumber),
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Maximum 8 characters required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default RegisterSchema;
