import { Card } from '../ui/card';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { truncateAddress } from '@/lib/utils';
import bitcoinLogo from '@/assets/bitcoin-logo.png';
import ethLogo from '@/assets/eth-logo.png';

export interface BtcCompletionCardProps {
  amount: string;
  recipientAddress: string;
  reservationTx: string;
  confirmations?: number;
  type?: 'position' | 'reservation';
}

export function BtcCompletionCard({
  amount,
  recipientAddress,
  reservationTx,
  confirmations = 20,
  type = 'position',
}: BtcCompletionCardProps) {
  const logoSrc = type === 'position' ? bitcoinLogo : ethLogo;

  return (
    <Card className="mt-4 w-full bg-[#100D16] rounded-xl p-3 md:p-4 border-none gap-0.5 overflow-hidden">
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="flex items-center gap-2 w-full p-3 rounded-xl bg-grey">
          <CheckCircledIcon className="w-4 h-4 text-green-500" />
          <span className="text-white text-[14px] md:text-[16px] font-medium">
            Transfer is successfully completed
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="text-[#888888] text-[13px]">Amount</span>
          <span className="text-white text-[14px] md:text-[16px] font-medium">
            {amount} BTC
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#888888] text-[13px]">Recipient address</span>
        <span className="text-[#FFAA2E] text-[12px] font-medium">
          {truncateAddress(recipientAddress)}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#888888] text-[13px]">TXID</span>
        <span className="text-[#FFAA2E] text-[12px] font-medium cursor-pointer flex items-center gap-1">
          <img
            src={logoSrc}
            alt={type === 'position' ? 'BTC' : 'xBTC'}
            className="w-4 h-4 inline"
          />
          {truncateAddress(reservationTx)}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#888888] text-[13px]">Confirmations</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-[13px] font-medium">
            {confirmations}
          </span>
          <CheckCircledIcon className="w-4 h-4 text-green-500" />
        </div>
      </div>
    </Card>
  );
}
