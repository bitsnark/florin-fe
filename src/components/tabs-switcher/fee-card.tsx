import { Card } from '@/components/ui/card';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface FeeCardProps {
  toCurrency: 'btc' | 'eth' | 'xbtc';
  isAnimating: boolean;
}

export function FeeCard({ toCurrency, isAnimating }: FeeCardProps) {
  return (
    <Card
      className={cn(
        'bg-primary border-none w-full sm:w-[400px] md:w-[440px] h-[104px] py-5 px-4 rounded-xl mt-3 transition-all duration-300 ease-in-out',
        isAnimating ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-text-secondary text-[13px]">
            You'll receive <InfoCircledIcon />
          </div>
          <div className="text-white text-right text-[13px]">
            0 {toCurrency === 'btc' ? 'BTC' : 'xBTC'}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-text-secondary text-[13px]">
            Network fee <InfoCircledIcon />
          </div>
          <div className="text-white text-right text-[13px]">~0.0013 ETH</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-text-secondary text-[13px]">Bridge fee</div>
          <div className="text-white text-right text-[13px]">free</div>
        </div>
      </div>
    </Card>
  );
}
