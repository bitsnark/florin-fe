import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <div className="px-4 md:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
