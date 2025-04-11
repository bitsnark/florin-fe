import { CommunityLinks } from '@/components/community-links';
import { FaqContainer } from '@/components/faq';
import { TabSwitcherContainer } from '@/components/tabs-switcher';
export function Index() {
  return (
    <div className="py-10 md:py-20">
      <TabSwitcherContainer />
      <FaqContainer />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <CommunityLinks />
    </div>
  );
}
