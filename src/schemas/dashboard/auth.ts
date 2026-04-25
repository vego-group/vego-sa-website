import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema, type LoginSchema }
