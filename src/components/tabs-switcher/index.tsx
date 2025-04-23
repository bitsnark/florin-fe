import { useState } from 'react';
import { TabSwitcher } from '@/components/ui/tab-switcher';
import { TransferTab } from './transfer-tab';
import { HistoryTab } from '@/components/history-table/history-tab';
import { Network, Currency } from './types';
import { useAccount } from 'wagmi';
import { Address, formatEther, parseEther } from 'viem';
import { useExchange } from '@/hooks/useExchange';
import { TransactionTrackerDialog } from '../transaction-tracker';

export function TabSwitcherContainer() {
  const { address } = useAccount();
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
  const [bitcoinAddress, setBitcoinAddress] = useState<Address | undefined>(
    undefined
  );
  const { openPosition, reservePosition, loading } = useExchange();
  const [openTracker, setOpenTracker] = useState(false);
  // TODO: Fix this type once we have the correct type for the transaction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trackerData, setTrackerData] = useState<any>({});
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let transaction: any;
    if (fromNetwork === 'bitcoin') {
      transaction = await reservePosition({
        tokenAmount: BigInt(parseEther(fromAmount)),
        reservationId: BigInt(1n),
        positionId: '0x1234' as Address,
        evmReceivingAddress: address!,
      });
    } else {
      transaction = await openPosition({
        tokenAmount: BigInt(parseEther(fromAmount)),
        exchangeRate: 1,
        bitcoinAddresses: bitcoinAddress!,
        deadline: Math.floor(Date.now() / 1000) + 3600, //ASK about this value to Elias
        owner: address!,
      });
    }

    setTrackerData(transaction);
    setOpenTracker(true);
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
        type={fromNetwork === 'bitcoin' ? 'btc' : 'eth'}
        open={openTracker}
        onOpenChange={setOpenTracker}
        transactionData={{
          type: fromNetwork === 'bitcoin' ? 'btc' : 'eth',
          amount:
            (trackerData?.logs &&
              trackerData?.logs[0] &&
              trackerData?.logs[0]?.args?.tokenAmount &&
              formatEther(trackerData?.logs[0]?.args?.tokenAmount)) ||
            '0.012',
          recipientAddress:
            trackerData?.logs && trackerData?.logs[0].args.bitcoinAddresses,
          reservationTx: trackerData?.receipt?.transactionHash,
          currentStep: 0,
        }}
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
