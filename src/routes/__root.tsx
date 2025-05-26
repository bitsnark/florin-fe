import { ConnectorsListDialog } from '@/components/evm-wallet-connector/connectors-list-dialog';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';

const Layout = () => {
  return  (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <ConnectorsListDialog />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <div className="px-4 md:px-0">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export const Route = createRootRoute({
  component: Layout
});

