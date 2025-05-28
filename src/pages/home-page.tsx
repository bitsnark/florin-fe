import { CommunityLinks } from '@/components/community-links';
import { FaqContainer } from '@/components/faq';
import { TabSwitcherContainer } from '@/components/tabs-switcher';
import { Hero } from '@/components/hero';
import heroImageGlobal from '@/assets/hero-image-global.png';

export function Home() {
  return (
    <div className="py-10 md:py-20">
      <Hero
        variant="center"
        topTitle="grail bridge"
        title="Send Bitcoin from Ethereum and back. Trustlessly."
        description="Florin is revolutionizing the way you manage cryptocurrency payments with seamless integrations, low fees, and instant transactions."
        imageSrc={heroImageGlobal}
        imageAlt="Hero Image"
      />
      <TabSwitcherContainer />
      <FaqContainer />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <CommunityLinks />
    </div>
  );
}
