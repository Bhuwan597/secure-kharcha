import { z } from "zod";

const UserSchema = z.object({
  uid: z.string().uuid(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  displayName: z.string().trim(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
  photo: z.string(),
  provider: z.string(),
});

export default UserSchema;
