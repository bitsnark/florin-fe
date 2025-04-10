import { AmountInput } from '@/components/amount-input';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import switchArrows from '@/assets/switch-arrows.svg';

interface TransferFormProps {
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
  handleSwitchNetworks: () => void;
  handleFromAmountChange: (value: string) => void;
  handleToAmountChange: (value: string) => void;
  setBitcoinAddress: (value: string) => void;
}

export function TransferForm({
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
  handleSwitchNetworks,
  handleFromAmountChange,
  handleToAmountChange,
  setBitcoinAddress,
}: TransferFormProps) {
  return (
    <div
      className={`flex flex-col items-center bg-primary w-full sm:w-[400px] md:w-[440px] h-[${
        toCurrency === 'btc' ? '506px' : '414px'
      }] py-5 px-4 rounded-xl transition-all duration-300 ease-in-out`}
    >
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isAnimating
            ? 'opacity-0 transform -translate-y-10'
            : 'opacity-100 transform translate-y-0'
        }`}
      >
        <AmountInput
          network={fromNetwork}
          currency={fromCurrency}
          amount={fromAmount}
          xbtcAmount={xbtcAmount}
          onAmountChange={handleFromAmountChange}
        />
      </div>
      <div
        className={`flex justify-center items-center bg-grey rounded-[10px] w-10 h-10 my-3 cursor-pointer hover:bg-gray-700 transition-colors`}
        onClick={handleSwitchNetworks}
      >
        <img
          src={switchArrows}
          alt="Switch"
          className="h-[13.846px] w-[15px]"
        />
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isAnimating
            ? 'opacity-0 transform translate-y-10'
            : 'opacity-100 transform translate-y-0'
        }`}
      >
        <AmountInput
          network={toNetwork}
          currency={toCurrency}
          amount={toAmount}
          xbtcAmount={xbtcAmount}
          onAmountChange={handleToAmountChange}
        />
      </div>

      <div
        className={`flex flex-col gap-1.5 w-full mt-3 transition-all duration-300 ease-in-out ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Label
          htmlFor="wallet-address"
          className="text-xs text-text-secondary font-bold flex flex-row gap-1"
        >
          Ethereum sending address
          <InfoCircledIcon />
        </Label>
        <Input
          id="wallet-address"
          disabled={true}
          placeholder={
            isWalletConnected ? ethWalletAddress : 'Connect your wallet first'
          }
        />
      </div>

      {toCurrency === 'btc' && (
        <div
          className={`flex flex-col gap-1.5 w-full mt-3 transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Label
            htmlFor="bitcoin-address"
            className="text-xs text-text-secondary font-bold flex flex-row gap-1"
          >
            Bitcoin receiving address
            <InfoCircledIcon />
          </Label>
          <Input
            id="bitcoin-address"
            placeholder="Paste your Bitcoin receiving address"
            value={bitcoinAddress}
            onChange={(e) => setBitcoinAddress(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
