import { Card } from './ui/card';
import walletIcon from '@/assets/wallet-icon.svg';
import bitcoinLogo from '@/assets/bitcoin-logo.png';
import ethLogo from '@/assets/eth-logo.png';
import xbtcLogo from '@/assets/xbtc-logo.svg';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const ASSETS = {
  BITCOIN_LOGO: bitcoinLogo,
  ETH_LOGO: ethLogo,
  XBTC_LOGO: xbtcLogo,
  NETWORK_LOGOS: {
    bitcoin: bitcoinLogo,
    ethereum: ethLogo,
  },
  CURRENCY_LOGOS: {
    btc: bitcoinLogo,
    eth: ethLogo,
    xbtc: xbtcLogo,
  },
};

interface AmountInputProps {
  network: 'bitcoin' | 'ethereum';
  currency: 'btc' | 'eth' | 'xbtc';
  amount: string;
  xbtcAmount?: string;
  onAmountChange?: (value: string) => void;
  readOnly?: boolean;
  maxBtc?: number;
  minBtc?: number;
  bitcoinPrice?: number;
}

export const AmountInput = ({
  network,
  currency,
  amount,
  xbtcAmount,
  onAmountChange,
  readOnly,
  maxBtc,
  minBtc,
  bitcoinPrice,
}: AmountInputProps) => {
  const networkLogoSrc = ASSETS.NETWORK_LOGOS[network];

  const logoSrc = ASSETS.CURRENCY_LOGOS[currency];

  const currencyBgColor =
    currency === 'btc'
      ? 'bg-bitcoin-bg'
      : currency === 'xbtc'
        ? 'bg-transparent'
        : 'bg-ethereum-bg';

  const networkName = network === 'bitcoin' ? 'Bitcoin' : 'Ethereum Network';

  const bgColor = network === 'bitcoin' ? 'bg-bitcoin-bg' : 'bg-ethereum-bg';

  const currencySymbol =
    currency === 'btc' ? 'BTC' : currency === 'eth' ? 'ETH' : 'xBTC';

  const cardBgClass =
    network === 'ethereum'
      ? 'bg-[var(--card-ethereum-bg)]'
      : 'bg-[var(--card-bitcoin-bg)]';

  const cardBorderClass =
    network === 'ethereum' ? 'border border-input-border' : 'border-none';

  const calculateUsdValue = useMemo(() => {
    const rates = {
      btc: bitcoinPrice,
      eth: bitcoinPrice,
      xbtc: 83400,
    };

    const numericAmount = parseFloat(amount) || 0;
    const rate = rates[currency] || 0;

    return (numericAmount * rate).toFixed(2);
  }, [amount, bitcoinPrice, currency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.');

    if (value === '') {
      onAmountChange?.('');
      return;
    }

    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      // If the value ends with a dot, keep it as is
      if (value.endsWith('.')) {
        onAmountChange?.(value);
        return;
      }
      const numValue = parseFloat(value);
      
      if (!isNaN(numValue)) {
        if (maxBtc && numValue >= Number(maxBtc)) {
          onAmountChange?.(maxBtc.toString());
        } else if (minBtc && numValue <= Number(minBtc)) {
          onAmountChange?.(minBtc.toString());
        } else {
          onAmountChange?.(value);
        }
      }
    }
  };

  // Convert the amount to use dot as decimal separator for display
  const normalizedAmount = amount.replace(',', '.');

  return (
    <Card
      className={cn(
        'w-full max-w-[408px] h-auto min-h-[116px] p-[10px_16px_16px_16px] rounded-2xl shadow-sm mb-0',
        cardBgClass,
        cardBorderClass
      )}
    >
      <div className="flex flex-col justify-between h-full gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-label-text font-inter font-medium text-xs sm:text-[13px] leading-[100%] tracking-[0%]">
              {network === 'bitcoin' ? 'From' : 'To'}
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  'w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center overflow-hidden',
                  bgColor
                )}
              >
                <img
                  src={networkLogoSrc}
                  alt={network}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-text-primary font-inter font-medium text-xs sm:text-[14px] leading-tight sm:leading-[20px] tracking-[0%] align-middle">
                {networkName}
              </span>
            </div>
          </div>

          {network === 'ethereum' && (
            <div className="flex items-center gap-1 sm:gap-2">
              <img
                src={walletIcon}
                alt="Wallet"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-text-primary font-medium text-xs sm:text-[14px]">
                {xbtcAmount ?? '0'} xBTC
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden',
                  currencyBgColor
                )}
              >
                <img
                  src={logoSrc}
                  alt={currency}
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-text-primary text-xl sm:text-2xl font-bold">
                  {currencySymbol}
                </span>
              </div>
            </div>
            {network === 'bitcoin' && (
              <span className="font-inter font-normal text-[11px] sm:text-[13px] leading-[100%] tracking-[0%] text-label-text whitespace-nowrap">
                min 0.0004 {currencySymbol} / max {maxBtc} {currencySymbol}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end">
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              value={normalizedAmount}
              onChange={handleAmountChange}
              className="text-text-primary text-2xl sm:text-3xl font-bold bg-transparent border-none outline-none text-right w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.000"
              readOnly={readOnly}
              
            />
            <span className="font-inter font-normal text-[10px] sm:text-[12px] leading-[100%] tracking-[0%] text-right align-middle text-text-secondary">
              ${calculateUsdValue}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
