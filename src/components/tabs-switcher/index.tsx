import { useState } from 'react';
import { TabSwitcher } from '@/components/ui/tab-switcher';
import { TransferTab } from './transfer-tab';
import { HistoryTab } from './history-tab';
import { Network, Currency } from './types';

export function TabSwitcherContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const [fromNetwork, setFromNetwork] = useState<Network>('bitcoin');
  const [toNetwork, setToNetwork] = useState<Network>('ethereum');
  const [fromCurrency, setFromCurrency] = useState<Currency>(
    fromNetwork === 'bitcoin' ? 'btc' : 'eth'
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    toNetwork === 'bitcoin' ? 'btc' : 'xbtc'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [fromAmount, setFromAmount] = useState('0.012');
  const [toAmount, setToAmount] = useState('0.012');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const xbtcAmount = '1.123';

  const tabs = ['Transfer', 'History'];
  const variant = 'default';
  const size = 'default';
  const isWalletConnected = false;
  const ethWalletAddress = '0x1234567890abcdef';

  const handleSwitchNetworks = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Delay the actual state change to wait for animation
    setTimeout(() => {
      setFromNetwork(toNetwork);
      setToNetwork(fromNetwork);
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);

      // Also swap the amounts
      const tempAmount = fromAmount;
      setFromAmount(toAmount);
      setToAmount(tempAmount);

      // Reset animation state after switch is complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Update the to amount to match the from amount for xBTC conversion (1:1 ratio)
    setToAmount(value);
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    // If you want bidirectional syncing, uncomment this:
    // setFromAmount(value);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant={variant}
        size={size}
        className="gap-2.5 bg-primary border-none"
      />

      <div className="my-3">
        {activeTab === 0 ? (
          <TransferTab
            fromNetwork={fromNetwork}
            toNetwork={toNetwork}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            fromAmount={fromAmount}
            toAmount={toAmount}
            xbtcAmount={xbtcAmount}
            isAnimating={isAnimating}
            isWalletConnected={isWalletConnected}
            ethWalletAddress={ethWalletAddress}
            bitcoinAddress={bitcoinAddress}
            termsAccepted={termsAccepted}
            handleSwitchNetworks={handleSwitchNetworks}
            handleFromAmountChange={handleFromAmountChange}
            handleToAmountChange={handleToAmountChange}
            setBitcoinAddress={setBitcoinAddress}
            setTermsAccepted={setTermsAccepted}
          />
        ) : (
          <HistoryTab />
        )}
      </div>
    </div>
  );
}
