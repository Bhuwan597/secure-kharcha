import { z } from "zod";

const GroupSchema = z.object({
    name: z.string().trim().min(1, "Group name is required."),
    description: z.string().trim().min(1, "Group description is required."),
    coverPhoto: z.string().optional(),
})

export default GroupSchema;