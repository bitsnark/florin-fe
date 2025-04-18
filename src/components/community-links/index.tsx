import { CommunityLink } from './community-link';

export function CommunityLinks() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 md:px-0">
      <span
        className="text-[#939097] text-[16px] font-bold leading-[120%] tracking-[1%]"
        style={{
          fontFamily: 'Druk, sans-setif',
        }}
      >
        COMMUNITY LINKS
      </span>
      <div className="flex flex-col md:flex-row gap-4 mt-10 w-full justify-center">
        <CommunityLink
          href="https://discord.com/invite/grail"
          label="Discord"
          community="discord"
        />
        <CommunityLink
          href="https://t.me/grailbridge"
          label="Telegram"
          community="telegram"
        />
        <CommunityLink
          href="https://x.com/grailbridge"
          label="X"
          community="x"
        />
        <CommunityLink
          href="https://github.com/grailbridge"
          label="GitHub"
          community="github"
        />
      </div>
    </div>
  );
}
