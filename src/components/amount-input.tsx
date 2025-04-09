import { Card } from './ui/card';
import walletIcon from '../assets/wallet-icon.svg';
import { useMemo } from 'react';

const ASSETS = {
  BITCOIN_LOGO: '/src/assets/bitcoin-logo.png',
  ETH_LOGO: '/src/assets/eth-logo.png',
  XBTC_LOGO: '/src/assets/xbtc-logo.svg',
};

interface AmountInputProps {
  network: 'bitcoin' | 'ethereum';
  currency: 'btc' | 'eth' | 'xbtc';
  amount: string;
}

export const AmountInput = ({
  network,
  currency,
  amount,
}: AmountInputProps) => {
  const networkLogoSrc = useMemo(
    () => (network === 'bitcoin' ? ASSETS.BITCOIN_LOGO : ASSETS.ETH_LOGO),
    [network]
  );

  const logoSrc = useMemo(
    () => (currency === 'btc' ? ASSETS.BITCOIN_LOGO : ASSETS.XBTC_LOGO),
    [currency]
  );

  const currencyBgColor = useMemo(
    () =>
      currency === 'btc'
        ? 'bg-bitcoin-bg'
        : currency === 'xbtc'
          ? 'bg-transparent'
          : 'bg-ethereum-bg',
    [currency]
  );

  const networkName = useMemo(
    () => (network === 'bitcoin' ? 'Bitcoin' : 'Ethereum Network'),
    [network]
  );

  const bgColor = useMemo(
    () => (network === 'bitcoin' ? 'bg-bitcoin-bg' : 'bg-ethereum-bg'),
    [network]
  );

  const currencySymbol = useMemo(
    () => (currency === 'btc' ? 'BTC' : currency === 'eth' ? 'ETH' : 'xBTC'),
    [currency]
  );

  const cardBgClass = useMemo(
    () =>
      network === 'ethereum'
        ? 'bg-[var(--card-ethereum-bg)]'
        : 'bg-[var(--card-bitcoin-bg)]',
    [network]
  );

  const cardBorderClass = useMemo(
    () =>
      network === 'ethereum' ? 'border border-input-border' : 'border-none',
    [network]
  );

  const calculateUsdValue = useMemo(() => {
    const rates = {
      btc: 83400,
      eth: 3200,
      xbtc: 83400,
    };

    const numericAmount = parseFloat(amount) || 0;
    const rate = rates[currency] || 0;

    return (numericAmount * rate).toFixed(2);
  }, [amount, currency]);

  return (
    <Card
      style={{
        padding: '10px 16px 16px 16px',
      }}
      className={`w-full max-w-[408px] h-auto min-h-[116px] 
      ${cardBgClass} rounded-2xl shadow-sm mb-0 ${cardBorderClass}`}
    >
      <div className="flex flex-col justify-between h-full gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-label-text font-inter font-medium text-xs sm:text-[13px] leading-[100%] tracking-[0%]">
              {network === 'bitcoin' ? 'From' : 'To'}
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 ${bgColor} rounded-full flex items-center justify-center overflow-hidden`}
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
                0 xBTC
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 ${currencyBgColor} rounded-full flex items-center justify-center overflow-hidden`}
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
            <span className="font-inter font-normal text-[11px] sm:text-[13px] leading-[100%] tracking-[0%] text-label-text">
              min 0.0004 {currencySymbol} / max 3 {currencySymbol}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-text-primary text-2xl sm:text-3xl font-bold">
              {amount}
            </span>
            <span className="font-inter font-normal text-[10px] sm:text-[12px] leading-[100%] tracking-[0%] text-right align-middle text-text-secondary">
              ${calculateUsdValue}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
