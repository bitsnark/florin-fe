import React from 'react';
import { Card } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import EthLogo from '@/assets/eth-logo.png';
import BtcLogo from '@/assets/bitcoin-logo.png';

interface TransactionCardProps {
  type: 'request' | 'btc';
  data: {
    amount: string;
    recipientAddress?: string;
    reservationTx?: string;
    txid?: string;
    confirmations?: number | React.ReactNode;
  };
}

export function TransactionCard({ type, data }: TransactionCardProps) {
  if (type === 'request') {
    return (
      <Card className="mt-4 w-full md:w-[400px] h-auto md:h-[127px] bg-[#100D16] rounded-xl p-3 md:p-4 border-none gap-0.5 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="text-[#888888] text-[13px]">Amount</span>
          <span className="text-white text-[14px] md:text-[16px] font-medium">
            {data.amount}
          </span>
        </div>
        <div className="flex gap-0 justify-between items-center">
          <span className="text-[#888888] text-[13px]">Recipient address</span>
          <span className="text-orange-light text-[10px] md:text-xs truncate max-w-[180px] md:max-w-[250px]">
            {data.recipientAddress}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#888888] text-[13px]">Reservation TX</span>
          <div className="flex items-center">
            <span className="text-orange-light text-[10px] md:text-xs truncate max-w-[180px] md:max-w-[250px]">
              <img
                src={EthLogo}
                alt="Ethereum Logo"
                className="w-4 h-4 inline mr-1"
              />
              {data.reservationTx}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#888888] text-[13px]">Confirmations</span>
          {typeof data.confirmations === 'number' ? (
            <span className="text-white text-[12px] font-medium">
              {data.confirmations}
            </span>
          ) : (
            <RefreshCw className="text-foreground w-4 h-4" />
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-4 w-full md:w-[400px] h-auto md:h-[103px] bg-[#100D16] rounded-xl p-3 md:p-4 border-none gap-0.5 overflow-hidden">
      <div className="flex justify-between items-center">
        <span className="text-[#888888] text-[13px]">Amount</span>
        <span className="text-white text-[14px] md:text-[16px] font-medium">
          {data.amount}
        </span>
      </div>
      <div className="flex gap-0 justify-between items-center">
        <span className="text-[#888888] text-[13px]">TXID</span>
        <span className="text-orange-light text-[10px] md:text-xs truncate max-w-[180px] md:max-w-[250px]">
          <img src={BtcLogo} alt="BTC Logo" className="w-4 h-4 inline mr-1" />
          {data.txid}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#888888] text-[13px]">Confirmations</span>
        <span className="text-white text-[12px] font-medium">
          {data.confirmations}
        </span>
      </div>
    </Card>
  );
}
