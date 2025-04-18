import { z } from 'zod';

const envSchema = z.object({
  VITE_WALLETCONNECT_PROJECT_ID: z.string().min(1, {
    message: 'VITE_WALLETCONNECT_PROJECT_ID is required',
  }),
  VITE_RPC_URL: z.string().min(1, { message: 'VITE_RPC_URL is required' }),
  VITE_EXCHANGE_CONTRACT_ADDRESS: z.string().min(1, {
    message: 'VITE_EXCHANGE_CONTRACT_ADDRESS is required',
  }),
  VITE_TOKEN_ADDRESS: z.string().min(1, {
    message: 'VITE_TOKEN_ADDRESS is required',
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
