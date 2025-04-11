import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import heroImageGlobal from '@/assets/hero-image-global.png';

export const Route = createRootRoute({
  component: () => (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <div>
        <Hero
          variant="center"
          topTitle="grail bridge"
          title="Send Bitcoin from Ethereum and back. Trustlessly."
          description="Florin is revolutionizing the way you manage cryptocurrency payments with seamless integrations, low fees, and instant transactions."
          imageSrc={heroImageGlobal}
          imageAlt="Hero Image"
        />
      </div>
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <div className="px-4 md:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
