import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    eSewa: z.string().refine(isValidPhoneNumber),
    email: z.string().email("Email is invalid"),
    photo: z.string().optional(),
});

export default UserSchema;
