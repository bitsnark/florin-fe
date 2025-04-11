import { TransferForm } from './transfer-form';
import { FeeCard } from './fee-card';
import { TermsSection } from './terms-section';
import { ConnectButton } from './connect-button';

interface TransferTabProps {
  fromNetwork: 'bitcoin' | 'ethereum';
  toNetwork: 'bitcoin' | 'ethereum';
  fromCurrency: 'btc' | 'eth' | 'xbtc';
  toCurrency: 'btc' | 'eth' | 'xbtc';
  fromAmount: string;
  toAmount: string;
  xbtcAmount: string;
  isAnimating: boolean;
  isWalletConnected: boolean;
  ethWalletAddress: string;
  bitcoinAddress: string;
  termsAccepted: boolean;
  handleSwitchNetworks: () => void;
  handleFromAmountChange: (value: string) => void;
  handleToAmountChange: (value: string) => void;
  setBitcoinAddress: (value: string) => void;
  setTermsAccepted: (value: boolean) => void;
}

export function TransferTab({
  fromNetwork,
  toNetwork,
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  xbtcAmount,
  isAnimating,
  isWalletConnected,
  ethWalletAddress,
  bitcoinAddress,
  termsAccepted,
  handleSwitchNetworks,
  handleFromAmountChange,
  handleToAmountChange,
  setBitcoinAddress,
  setTermsAccepted,
}: TransferTabProps) {
  return (
    <>
      <TransferForm
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
        handleSwitchNetworks={handleSwitchNetworks}
        handleFromAmountChange={handleFromAmountChange}
        handleToAmountChange={handleToAmountChange}
        setBitcoinAddress={setBitcoinAddress}
      />

      <FeeCard toCurrency={toCurrency} isAnimating={isAnimating} />

      {!isWalletConnected && (
        <TermsSection
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          toNetwork={toNetwork}
          isAnimating={isAnimating}
        />
      )}

      <ConnectButton
        isWalletConnected={isWalletConnected}
        termsAccepted={termsAccepted}
        toCurrency={toCurrency}
        bitcoinAddress={bitcoinAddress}
        isAnimating={isAnimating}
      />
    </>
  );
}
