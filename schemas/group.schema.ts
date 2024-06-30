import { z } from "zod";

const GroupSchema = z.object({
    name: z.string().trim().min(1, "Group name is required."),
    description: z.string().trim().min(1, "Group description is required."),
    owner: z.string().min(1, "Owner is required."),
    coverPhoto: z.string(),
    token: z.string(),
    createdAt: z.string().default(Date.now().toLocaleString()),
})

export default GroupSchema;