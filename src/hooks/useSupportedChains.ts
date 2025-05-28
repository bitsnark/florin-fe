import { useEffect, useState } from 'react';
import { supportedChains } from '@/config/evm-chains';

export function useSupportedChains() {
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_chainId' }).then((id: string) => {
        setChainId(parseInt(id, 16));
      });
      const handler = (id: string) => {
        setChainId(parseInt(id, 16));
      };
      window.ethereum.on('chainChanged', handler);
      return () => {
        window.ethereum.removeListener('chainChanged', handler);
      };
    }
  }, []);

  const isSupported =
    chainId !== null && supportedChains.some(chain => chain.id === chainId);

  return { chainId, isSupported };
}
