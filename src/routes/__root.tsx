import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen w-full">
      <div className="container mx-auto p-4">
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/history" className="[&.active]:font-bold">
            History
          </Link>{' '}
          <Link to="/design-system" className="[&.active]:font-bold">
            Design System
          </Link>
        </div>
        <hr />
        <Outlet />
      </div>
    </div>
  ),
});
