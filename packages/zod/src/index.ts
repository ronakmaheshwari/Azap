import z from "zod"

export const BankValidator = z.object({
    token:z.string(),
    user_identifier:z.number(),
    amount:z.number()
})