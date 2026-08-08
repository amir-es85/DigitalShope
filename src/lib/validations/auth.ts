import { z } from 'zod';
export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required').min(3, 'Name must be at least 3 characters'),

  email: z.string().min(1, 'Email is required').email('Invalid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
