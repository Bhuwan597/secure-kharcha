import { z } from "zod";

const TransactionFormSchema = z.object({
    title: z.string().min(1, {message: "Transaction title cannot be empty."}),
    description: z.string().min(1, {message: "Transaction title cannot be empty."}),
    amount: z.number().min(1, "Amount must be greater than 0."),
    split: z.boolean().default(true).optional(),
    exclude: z.array(z.string()).optional()
})

export default TransactionFormSchema;