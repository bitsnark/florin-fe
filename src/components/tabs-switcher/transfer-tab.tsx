import { TransferForm } from './transfer-form';
import { FeeCard } from './fee-card';
import { TermsSection } from './terms-section';
import { ConnectButton } from './connect-button';
import { Address } from 'viem';
import { Button } from '../ui/button';

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
  ethWalletAddress?: Address;
  bitcoinAddress?: Address;
  termsAccepted: boolean;
  handleSwitchNetworks: () => void;
  handleFromAmountChange: (value: string) => void;
  handleToAmountChange: (value: string) => void;
  setBitcoinAddress: (value: Address | undefined) => void;
  setTermsAccepted: (value: boolean) => void;
  handleBridgeFunds: () => void;
  loading: boolean;
  maxBtc: number;
  minBtc: number;
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
  handleBridgeFunds,
  loading,
  maxBtc,
  minBtc,
}: TransferTabProps) {

  // TODO: REFACTOR, validate form using zod
  const disabled = !termsAccepted || loading || (!bitcoinAddress && fromNetwork === 'ethereum') || (Number(fromAmount) < minBtc || Number(fromAmount) > maxBtc);
  
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
        maxBtc={maxBtc}
        minBtc={minBtc}
      />
      <FeeCard toCurrency={toCurrency} isAnimating={isAnimating} />
      {isWalletConnected && (
        <TermsSection
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          toNetwork={toNetwork}
          isAnimating={isAnimating}
        />
      )}
      <div className="flex justify-center mt-5">
        <ConnectButton
          isWalletConnected={isWalletConnected}
          isAnimating={isAnimating}
        />
        {isWalletConnected && (
          <Button
            onClick={handleBridgeFunds}
            isAnimating={isAnimating}
            variant="orange"
            size="custom"
            disabled={disabled}
          >
            {'Bridge funds'}
          </Button>
        )}
      </div>
    </>
  );
}
