import { z } from "zod";

const SignInSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(1, "Password is required.")
})

export default SignInSchema;