import { DesignSystem } from '@/pages/DesignSystem';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/design-system')({
  component: DesignSystem,
});
