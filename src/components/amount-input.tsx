import { Card } from './ui/card';
import walletIcon from '../assets/wallet-icon.svg';

const ASSETS = {
  BITCOIN_LOGO: '/src/assets/bitcoin-logo.png',
  ETH_LOGO: '/src/assets/eth-logo.png',
  XBTC_LOGO: '/src/assets/xbtc-logo.svg',
};

const NETWORK_LOGOS = {
  bitcoin: ASSETS.BITCOIN_LOGO,
  ethereum: ASSETS.ETH_LOGO,
};

const CURRENCY_LOGOS = {
  btc: ASSETS.BITCOIN_LOGO,
  xbtc: ASSETS.XBTC_LOGO,
  eth: ASSETS.ETH_LOGO,
};

const CURRENCY_BG_COLORS = {
  btc: 'bg-bitcoin-bg',
  xbtc: 'bg-transparent',
  eth: 'bg-ethereum-bg',
};

const NETWORK_NAMES = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum Network',
};

const NETWORK_BG_COLORS = {
  bitcoin: 'bg-bitcoin-bg',
  ethereum: 'bg-ethereum-bg',
};

const CURRENCY_SYMBOLS = {
  btc: 'BTC',
  eth: 'ETH',
  xbtc: 'xBTC',
};

const CARD_BG_CLASSES = {
  bitcoin: 'bg-[var(--card-bitcoin-bg)]',
  ethereum: 'bg-[var(--card-ethereum-bg)]',
};

const CARD_BORDER_CLASSES = {
  bitcoin: 'border-none',
  ethereum: 'border border-input-border',
};

const CURRENCY_RATES = {
  btc: 83400,
  eth: 3200,
  xbtc: 83400,
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
  const networkLogoSrc = NETWORK_LOGOS[network];
  const logoSrc = CURRENCY_LOGOS[currency];
  const currencyBgColor = CURRENCY_BG_COLORS[currency];
  const networkName = NETWORK_NAMES[network];
  const bgColor = NETWORK_BG_COLORS[network];
  const currencySymbol = CURRENCY_SYMBOLS[currency];
  const cardBgClass = CARD_BG_CLASSES[network];
  const cardBorderClass = CARD_BORDER_CLASSES[network];

  const numericAmount = parseFloat(amount) || 0;
  const rate = CURRENCY_RATES[currency] || 0;
  const calculateUsdValue = (numericAmount * rate).toFixed(2);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      onAmountChange?.(value);
    }
  };

  return (
    <Card
      className={`w-full max-w-[408px] h-auto min-h-[116px] p-[10px_16px_16px_16px]
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
                {xbtcAmount ?? '0'} xBTC
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
