import z from "zod"

export const BankValidator = z.object({
    token:z.string(),
    // user_identifier:z.number().optional(),
    // amount:z.number().optional()
})

export const SigninValidator = z.object({
  username: z.string().min(3,"Username must be at least 3 letters"),
  phone: z.string().min(10,"Phone number must be at least 10 digits"),
  password: z.string().min(6,"Password must be at least 6 letters")
});