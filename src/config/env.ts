import { z } from 'zod';

const envSchema = z.object({
  VITE_WALLETCONNECT_PROJECT_ID: z.string().min(1, {
    message: 'VITE_WALLETCONNECT_PROJECT_ID is required',
  }),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
