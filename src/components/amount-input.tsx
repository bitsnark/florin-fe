import { Card } from './ui/card';
import walletIcon from '@/assets/wallet-icon.svg';
import { cn } from '@/lib/utils';

const ASSETS = {
  BITCOIN_LOGO: '/src/assets/bitcoin-logo.png',
  ETH_LOGO: '/src/assets/eth-logo.png',
  XBTC_LOGO: '/src/assets/xbtc-logo.svg',
  NETWORK_LOGOS: {
    bitcoin: '/src/assets/bitcoin-logo.png',
    ethereum: '/src/assets/eth-logo.png',
  },
  CURRENCY_LOGOS: {
    btc: '/src/assets/bitcoin-logo.png',
    eth: '/src/assets/eth-logo.png',
    xbtc: '/src/assets/xbtc-logo.svg',
  },
};

interface AmountInputProps {
  network: 'bitcoin' | 'ethereum';
  currency: 'btc' | 'eth' | 'xbtc';
  amount: string;
  xbtcAmount?: string;
  onAmountChange?: (value: string) => void;
}

export const AmountInput = ({
  network,
  currency,
  amount,
  xbtcAmount,
  onAmountChange,
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

  const calculateUsdValue = (() => {
    const rates = {
      btc: 83400,
      eth: 3200,
      xbtc: 83400,
    };

    const numericAmount = parseFloat(amount) || 0;
    const rate = rates[currency] || 0;

    return (numericAmount * rate).toFixed(2);
  })();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      onAmountChange?.(value);
    }
  };

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
                min 0.0004 {currencySymbol} / max 3 {currencySymbol}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="text-text-primary text-2xl sm:text-3xl font-bold bg-transparent border-none outline-none text-right w-full"
              placeholder="0.000"
              readOnly={network === 'ethereum'}
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
