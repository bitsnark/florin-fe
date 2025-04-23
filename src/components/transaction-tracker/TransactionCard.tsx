import React from 'react';
import { Card } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import EthLogo from '@/assets/eth-logo.png';
import BtcLogo from '@/assets/bitcoin-logo.png';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { truncateAddress } from '@/lib/utils';
import { InfoField } from './InfoField';

interface TransactionCardProps {
  type: 'btc' | 'eth';
  data: {
    amount: string;
    fiatAmount: string;
    recipientAddress?: string;
    reservationTx?: string;
    txid?: string;
    confirmations?: number | React.ReactNode;
  };
  isStepThree?: boolean;
}

const isHighAmount = (amount: string) => {
  const amountNumber = parseFloat(amount);
  return amountNumber >= 100;
};

export function TransactionCard({
  type,
  data,
  isStepThree = false,
}: TransactionCardProps) {
  const renderConfirmations = () => {
    if (type === 'btc' && isHighAmount(data.fiatAmount)) {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-white text-[12px] font-medium">
            {data.confirmations}
          </span>
          {data.confirmations === 20 ? (
            <CheckCircledIcon className="text-green-600 w-4 h-4" />
          ) : (
            <RefreshCw className="text-foreground w-4 h-4 animate-[spin_2s_linear_infinite]" />
          )}
        </div>
      );
    } else if (type === 'btc') {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-white text-[12px] font-medium">
            {data.confirmations}
          </span>
          <CheckCircledIcon className="text-green-600 w-4 h-4" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-white text-[12px] font-medium">
            {data.confirmations}
          </span>
          {data.confirmations === 20 ? (
            <CheckCircledIcon className="text-green-600 w-4 h-4" />
          ) : (
            <RefreshCw className="text-foreground w-4 h-4 animate-[spin_2s_linear_infinite]" />
          )}
        </div>
      );
    }
  };

  const renderAmount = () => (
    <span className="text-white text-[14px] md:text-[16px] font-medium">
      {isStepThree ? data.amount : `~${data.amount}`}{' '}
      {type === 'btc' ? (isStepThree ? 'BTC' : 'BTC') : 'XBTC'}
    </span>
  );

  const renderAddress = () => (
    <span className="text-orange-light text-[10px] md:text-xs cursor-pointer max-w-[180px] md:max-w-[250px]">
      {data.recipientAddress && truncateAddress(data.recipientAddress)}
    </span>
  );

  const renderReservationTx = () => (
    <div className="flex items-center">
      <img src={EthLogo} alt="Ethereum Logo" className="w-4 h-4 inline mr-1" />
      <span className="text-orange-light text-[10px] md:text-xs cursor-pointer max-w-[180px] md:max-w-[250px] pt-0.5">
        {data.reservationTx && truncateAddress(data.reservationTx)}
      </span>
    </div>
  );

  const renderTxid = () => (
    <span className="text-orange-light text-[10px] md:text-xs truncate max-w-[180px] md:max-w-[250px]">
      <img src={BtcLogo} alt="BTC Logo" className="w-4 h-4 inline mr-1" />
      {data.txid && truncateAddress(data.txid)}
    </span>
  );

  if (!isStepThree) {
    return (
      <Card className="mt-4 min-w-[300px] md:w-[400px] h-auto md:h-[127px] bg-[#100D16] rounded-xl p-3 md:p-4 border-none gap-0.5 overflow-hidden">
        <InfoField label="Amount" value={renderAmount()} />
        <InfoField label="Recipient address" value={renderAddress()} />
        <InfoField label="Reservation TX" value={renderReservationTx()} />
        <InfoField label="Confirmations" value={renderConfirmations()} />
      </Card>
    );
  }

  return (
    <Card className="mt-4 min-w-[300px] md:w-[400px] h-auto md:h-[127px] bg-[#100D16] rounded-xl p-3 md:p-4 border-none gap-0.5 overflow-hidden">
      <InfoField label="Amount" value={renderAmount()} />
      <InfoField label="TXID" value={renderTxid()} />
      <InfoField
        label="Confirmations"
        value={
          <span className="text-white text-[12px] font-medium">
            {data.confirmations}
          </span>
        }
      />
    </Card>
  );
}
