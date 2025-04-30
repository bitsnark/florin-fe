import { Card } from '../ui/card';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { truncateAddress } from '@/lib/utils';

export interface EthCompletionCardProps {
  amount: string;
  recipientAddress: string;
  reservationTx: string;
  confirmations?: number;
}

export function EthCompletionCard({
  amount,
  recipientAddress,
  reservationTx,
  confirmations = 20,
}: EthCompletionCardProps) {
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
            {amount} xBTC
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#888888] text-[13px]">Recipient address</span>
        <span className="text-orange-light text-[12px] font-medium">
          {truncateAddress(recipientAddress)}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-[#888888] text-[13px]">TXID</span>
        <span className="text-orange-light text-[12px] font-medium cursor-pointer">
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
