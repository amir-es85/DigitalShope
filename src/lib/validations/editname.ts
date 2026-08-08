import z from 'zod';

export const EditNameSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be less than 30 characters'),
});

export type EditNameSchemaType = z.infer<typeof EditNameSchema>;
