import { useMemo, useState } from 'react';
import { useAmountValidation } from './useAmountValidation';

interface UseAmountInputProps {
  amount: string;
  currency: 'btc' | 'eth' | 'xbtc';
  maxBtc?: number;
  minBtc?: number;
  bitcoinPrice?: number;
  isFromXbtcToBtc?: boolean;
  xbtcAmount?: string;
  onAmountChange?: (value: string) => void;
}

export const useAmountInput = ({
  amount,
  currency,
  maxBtc,
  minBtc,
  bitcoinPrice,
  isFromXbtcToBtc,
  xbtcAmount,
  onAmountChange,
}: UseAmountInputProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { validateAmount } = useAmountValidation({
    currency,
    maxBtc,
    minBtc,
    isFromXbtcToBtc,
    xbtcAmount,
  });

  const calculateUsdValue = useMemo(() => {
    const rates = {
      btc: bitcoinPrice,
      eth: bitcoinPrice,
      xbtc: bitcoinPrice,
    };

    const numericAmount = parseFloat(amount) || 0;
    const rate = rates[currency] || 0;

    return (numericAmount * rate).toFixed(2);
  }, [amount, bitcoinPrice, currency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.');

    if (value === '') {
      onAmountChange?.('');
      setErrorMessage(null);
      return;
    }

    if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
      return;
    }

    if (value.endsWith('.')) {
      onAmountChange?.(value);
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return;
    }

    const { error } = validateAmount(value, numValue);
    setErrorMessage(error);
    onAmountChange?.(value);
  };

  return {
    errorMessage,
    calculateUsdValue,
    handleAmountChange,
  };
}; 