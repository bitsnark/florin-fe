import { useState } from 'react';
import { TabSwitcher } from '@/components/ui/tab-switcher';
import { TransferTab } from './transfer-tab';
import { HistoryTab } from '@/components/history-table/history-tab';
import { Network, Currency } from './types';
import { useAccount, useChainId } from 'wagmi';
import { Address, parseEther } from 'viem';
import { useExchange } from '@/hooks/useExchange';
import { TransactionTrackerDialog } from '../transaction-tracker';
import { Position, Reservation } from '@/types';

type TrackerData = {
  type: 'position' | 'reservation';
  open: boolean;
  transactionId: string;
};
export function TabSwitcherContainer() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [activeTab, setActiveTab] = useState(0);
  const [fromNetwork, setFromNetwork] = useState<Network>('bitcoin');
  const [toNetwork, setToNetwork] = useState<Network>('ethereum');
  console.log({ fromNetwork, toNetwork });
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
  const [bitcoinAddress, setBitcoinAddress] = useState<Address | undefined>(
    undefined
  );
  const { openPosition, reservePosition, loading } = useExchange();
  // TODO: Fix this type once we have the correct type for the transaction
  const [trackerData, setTrackerData] = useState<TrackerData>({
    type: 'position',
    open: false,
    transactionId: '',
  });

  const xbtcAmount = '1.123';
  const tabs = ['Transfer', 'History'];
  const variant = 'default';
  const size = 'default';
  const isWalletConnected = !!address;
  const ethWalletAddress = address;

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

  const handleBridgeFunds = async () => {
    // TODO: Fix this type once we have the correct type for the transaction
    let transaction: Position | Reservation | undefined;
    if (fromNetwork === 'ethereum') {
      transaction = await reservePosition({
        tokenAmount: BigInt(parseEther(fromAmount)),
        evmReceivingAddress: address!,
        chainId,
        owner: address!,
      });
    } else {
      transaction = await openPosition({
        tokenAmount: BigInt(parseEther(fromAmount)),
        exchangeRate: 1,
        bitcoinAddresses: bitcoinAddress!,
        deadline: Math.floor(Date.now() / 1000) + 3600, //ASK about this value to Elias
        owner: address!,
        chainId,
      });
    }
    console.log('transaction', transaction, fromNetwork);
    setTrackerData({
      type: fromNetwork === 'bitcoin' ? 'position' : 'reservation',
      open: true,
      transactionId:
        fromNetwork === 'bitcoin'
          ? (transaction as Position)?.positionId
          : (transaction as Reservation)?.reservationId,
    });
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
      <TransactionTrackerDialog
        open={trackerData?.open}
        onOpenChange={(open) => {
          setTrackerData((prev) => ({ ...prev, open }));
        }}
        type={trackerData?.type}
        id={trackerData?.transactionId}
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
            handleBridgeFunds={handleBridgeFunds}
            loading={loading}
          />
        ) : (
          <HistoryTab />
        )}
      </div>
    </div>
  );
}
