import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-screen">
      <div
        className="w-full flex justify-center"
        style={{
          border: '1px solid red',
        }}
      >
        <div
          className="p-2 flex gap-2 w-[1024px] h-[120px] justify-between pt-8"
          style={{ border: 'solid 1px yellow' }}
        >
          {/* <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/history" className="[&.active]:font-bold">
            History
          </Link>
          <Link to="/design-system" className="[&.active]:font-bold">
            Design System
          </Link> */}
          <div className="flex gap-2" style={{ border: 'solid 1px blue' }}>
            <span>imagen</span>
            <span>Grail Bridge</span>
          </div>
          <div>menu</div>
          <div>connect wallet</div>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  ),
});
