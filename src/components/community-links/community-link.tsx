import discordLogo from '@/assets/discord-logo.png';
import telegramLogo from '@/assets/telegram-logo.png';
import xLogo from '@/assets/x-logo.png';
import githubLogo from '@/assets/github-logo.png';
import { Card } from '@/components/ui/card';

interface CommunityLinkProps {
  href: string;
  label: string;
  community: 'discord' | 'telegram' | 'x' | 'github';
}

export function CommunityLink({ href, label, community }: CommunityLinkProps) {
  const logoMap = {
    discord: discordLogo,
    telegram: telegramLogo,
    x: xLogo,
    github: githubLogo,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[359px] md:w-[215px] no-underline"
    >
      <Card className="bg-grey pt-2 pr-8 pb-2 pl-2 h-[88px] rounded-xl backdrop-blur-lg border-none flex flex-row items-center gap-5 cursor-pointer">
        <div className="w-[72px] h-[72px] flex items-center justify-center rounded-xl bg-primary">
          <img
            src={logoMap[community]}
            alt={`${community} logo`}
            className="w-[27px] h-[27px]"
          />
        </div>
        <div>
          <span className="text-white font-semibold text-lg">{label}</span>
        </div>
      </Card>
    </a>
  );
}
