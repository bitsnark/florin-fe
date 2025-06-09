export function formatConfirmations(confirmations: number): string {
  return confirmations >= 1000 ? '+1000' : confirmations.toString();
} 