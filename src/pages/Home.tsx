import { CommunityLinks } from '@/components/community-links';
import { FaqContainer } from '@/components/faq';

export function Index() {
  return (
    <div className="py-20">
      <FaqContainer />
      <hr className="border-t border-[#3A3740] h-[1px]" />
      <CommunityLinks />
    </div>
  );
}
