import { useState } from 'react';
import { TransferForm } from './transfer-form';
import { FeeCard } from './fee-card';
import { TermsSection } from './terms-section';
import { ConnectButton } from './connect-button';
import { Button } from '../ui/button';
import { isValidBitcoinAddress } from '@/lib/utils';
import { Network, Currency } from './types';
import { useChainId } from 'wagmi';
import { Address, parseEther } from 'viem';
import { useExchange } from '@/hooks/useExchange';
import { Position, Reservation } from '@/types';
import { useMaxMinBtc } from '@/hooks/queries/useMaxMinBtc';
import { useBitSnarkBalance } from '@/hooks/useBitSnarkBalance';
import { useAccount } from 'wagmi';

interface TransferTabProps {
  onTransactionCreated: (type: 'position' | 'reservation', id: string, txHash: string) => void;
}

export function TransferTab({ onTransactionCreated }: TransferTabProps) {
  const { address } = useAccount();
  const chainId = useChainId();
  const [fromNetwork, setFromNetwork] = useState<Network>('bitcoin');
  const [toNetwork, setToNetwork] = useState<Network>('ethereum');
  const [fromCurrency, setFromCurrency] = useState<Currency>(
    fromNetwork === 'bitcoin' ? 'btc' : 'eth'
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    toNetwork === 'bitcoin' ? 'btc' : 'xbtc'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [fromAmount, setFromAmount] = useState('0');
  const [toAmount, setToAmount] = useState('0');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState<string | undefined>(undefined);
  
  const { openPosition, reservePosition, loading } = useExchange();
  const { data } = useMaxMinBtc();
  const maxBtc = data?.maxAmount || 0;
  const minBtc = data?.minAmount || 0;
  const { balance: xbtcAmount } = useBitSnarkBalance();
  const isWalletConnected = !!address;

  const handleSwitchNetworks = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setFromNetwork(toNetwork);
      setToNetwork(fromNetwork);
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);

      const tempAmount = fromAmount;
      setFromAmount(toAmount);
      setToAmount(tempAmount);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(value);
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    if (fromCurrency === 'xbtc' && toCurrency === 'btc') {
      setFromAmount(value);
    }
  };

  const handleBridgeFunds = async () => {
    const normalizedAmount = fromAmount.replace(',', '.');

    let transaction: Position | Reservation | undefined;
    if (fromNetwork === 'bitcoin') {
      transaction = await reservePosition({
        tokenAmount: parseEther(normalizedAmount),
        evmReceivingAddress: address!,
        chainId,
        owner: address!,
      });
    } else {
      transaction = await openPosition({
        tokenAmount: parseEther(normalizedAmount),
        exchangeRate: 1,
        bitcoinAddresses: bitcoinAddress! as Address,
        deadline: Math.floor(Date.now() / 1000) + 3600,
        owner: address!,
        chainId,
      });
    }
    if (transaction) {
      onTransactionCreated(
        fromNetwork === 'ethereum' ? 'position' : 'reservation',
        fromNetwork === 'ethereum'
          ? (transaction as Position)?.positionId
          : (transaction as Reservation)?.reservationId,
        transaction.hash
      );
    }
  };

  // TODO: REFACTOR, validate form using zod
  const isBitcoinAddressValid =
    fromNetwork === 'ethereum' && toCurrency === 'btc'
      ? isValidBitcoinAddress(bitcoinAddress as string)
      : true;

  const disabled =
    !termsAccepted ||
    loading ||
    (fromNetwork === 'ethereum' &&
      (!bitcoinAddress || !isBitcoinAddressValid)) ||
    Number(fromAmount) < minBtc ||
    Number(fromAmount) > maxBtc;

  const handleBridgeAndReset = () => {
    handleBridgeFunds();
    // Reset form after bridge operation
    handleFromAmountChange('');
    handleToAmountChange('');
    if (fromNetwork === 'ethereum') {
      setBitcoinAddress('');
    }
    setTermsAccepted(false);
  };

  return (
    <>
      <TransferForm
        fromNetwork={fromNetwork}
        toNetwork={toNetwork}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        fromAmount={fromAmount}
        toAmount={toAmount}
        xbtcAmount={xbtcAmount.toString()}
        isAnimating={isAnimating}
        isWalletConnected={isWalletConnected}
        ethWalletAddress={address}
        bitcoinAddress={bitcoinAddress}
        bitcoinAddressValid={isBitcoinAddressValid}
        handleSwitchNetworks={handleSwitchNetworks}
        handleFromAmountChange={handleFromAmountChange}
        handleToAmountChange={handleToAmountChange}
        setBitcoinAddress={setBitcoinAddress}
        maxBtc={maxBtc}
        minBtc={minBtc}
      />
      <FeeCard
        toCurrency={toCurrency}
        isAnimating={isAnimating}
        amount={fromAmount}
      />
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
            onClick={handleBridgeAndReset}
            isAnimating={isAnimating}
            variant="orange"
            size="custom"
            disabled={disabled}
            loading={loading}
          >
            {'Bridge funds'}
          </Button>
        )}
      </div>
    </>
  );
}
