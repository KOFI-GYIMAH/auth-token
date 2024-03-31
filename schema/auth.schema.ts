import { z } from 'zod';

export const EmailPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Must be at least 5 characters'),
});
export type EmailPasswordType = z.output<typeof EmailPasswordSchema>;

export const APIKeySchema = z.object({
  apiKey: z.string().email('Invalid email'),
});
export type APIKeyType = z.output<typeof APIKeySchema>;
