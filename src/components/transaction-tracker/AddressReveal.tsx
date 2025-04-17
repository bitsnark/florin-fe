import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CopyIcon } from '@radix-ui/react-icons';
import { QrCode } from 'lucide-react';
import { CircleProgress } from './CircleProgress';
import { EyeIcon } from './EyeIcon';
import { QRCode } from './QRCode';

interface AddressRevealProps {
  amount: string;
  address: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  progress: number;
}

export function AddressReveal({
  amount,
  address,
  timeLeft,
  progress,
}: AddressRevealProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format time as 00:00:00
  const formattedTime = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;

  // Handle copy to clipboard
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className={`w-full p-3 cursor-pointer border-none bg-grey flex flex-col items-center gap-2 ${
        !showAddress
          ? 'h-[100px] md:h-[116px] justify-center'
          : 'h-auto md:h-[500px]'
      }`}
      onClick={() => setShowAddress(!showAddress)}
    >
      <>
        {!showAddress ? (
          <>
            <span className="mr-2 text-[#939097] text-[12px] md:text-[13px]">
              Show the address
            </span>
            <div className="w-[50px] h-[50px] md:w-[57px] md:h-[57px] bg-[#1E1C21] flex items-center justify-center rounded-lg">
              <EyeIcon />
            </div>
          </>
        ) : (
          <>
            <div className="max-h-full w-full">
              <div className="flex gap-2 md:gap-4 items-center justify-between mb-3 md:mb-4">
                <div className="relative w-[35px] h-[35px] md:w-[38px] md:h-[38px]">
                  <CircleProgress progress={progress} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[11px] md:text-[13px] mb-1">
                    Reservation expires in
                  </span>
                  <span className="text-[#4CAF50] text-xl md:text-2xl font-medium text-center">
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-[#888888] text-[11px] md:text-[13px]">
                Amount
              </span>
              <span className="text-white text-[11px] md:text-[13px]">
                {amount}
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-[#888888] text-[11px] md:text-[13px]">
                Bitcoin address
              </span>
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-orange-light text-[10px] md:text-[13px] truncate max-w-[100px] md:max-w-none">
                  {address}
                </span>
                <div
                  className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] md:w-[33px] md:h-[35px] rounded-lg bg-[#3A3740]"
                  onClick={copyToClipboard}
                >
                  <CopyIcon
                    className={`w-3 h-3 md:w-4 md:h-4 ${copied ? 'text-green-500' : 'text-white'}`}
                  />
                </div>
                <div
                  className="cursor-pointer flex items-center justify-center w-[30px] h-[30px] md:w-[33px] md:h-[35px] rounded-lg bg-[#3A3740]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQrCode(!showQrCode);
                  }}
                >
                  <QrCode className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
            </div>
            {showQrCode && <QRCode address={address} />}
          </>
        )}
      </>
    </Card>
  );
}
