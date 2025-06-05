import { env } from "@/config/env";
import { ContractManager } from "@/services/ContractManager";
import { useEffect, useRef, useState } from "react";

interface UseTxConfirmationsProps {
  isActive: boolean;
  maxConfirmations?: number;
  transactionHash?: string;
}

export function useTxConfirmations({
  isActive,
  maxConfirmations = env.VITE_EVM_CONFIRMATIONS,
  transactionHash,
}: UseTxConfirmationsProps) {
  const [confirmations, setConfirmations] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive || !transactionHash) {
      setConfirmations(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const checkConfirmations = async () => {
      try {
        const contractManager = await ContractManager.getInstance();
        const receipt = await contractManager.publicClient.getTransactionReceipt({
          hash: transactionHash as `0x${string}`,
        });
        if (receipt) {
          const currentBlock = await contractManager.publicClient.getBlockNumber();
          const confirmations = Number(currentBlock - receipt.blockNumber);
          setConfirmations(Math.min(confirmations, maxConfirmations));

          if (confirmations >= maxConfirmations) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }
      } catch (error) {
        console.error('Error checking confirmations:', error);
      }
    };

    // Check immediately and then every 5 seconds
    checkConfirmations();
    intervalRef.current = setInterval(checkConfirmations, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, transactionHash, maxConfirmations]);

  return confirmations;
}