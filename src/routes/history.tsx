import { History } from '@/pages/History';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/history')({
  component: History,
});
