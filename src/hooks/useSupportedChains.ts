import { useEffect, useState } from 'react';
import { supportedChains } from '@/config/evm-chains';
import { useAccount } from 'wagmi';

export function useSupportedChains() {
  const [chainId, setChainId] = useState<number | null>(null);
  const { isConnected } = useAccount();

  useEffect(() => {
    const getChainId = async () => {
      try {
        // Intentar obtener el chainId del provider actual
        const provider = window.ethereum?.providers?.find((p: { isMetaMask?: boolean }) => p.isMetaMask) || window.ethereum;
        
        if (provider) {
          const id = await provider.request({ method: 'eth_chainId' });
          console.log('Raw chain ID from provider:', id);
          setChainId(parseInt(id as string, 16));
        }
      } catch (error) {
        console.error('Error getting chain ID:', error);
      }
    };

    if (isConnected) {
      getChainId();

      const handleChainChanged = (id: string) => {
        console.log('Chain changed event received:', id);
        setChainId(parseInt(id, 16));
      };

      window.ethereum?.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    } else {
      setChainId(null);
    }
  }, [isConnected]);

  const isSupported = isConnected && chainId !== null && supportedChains.some(chain => chain.id === chainId);

  console.log('Current chain ID:', chainId);
  console.log('Is connected:', isConnected);
  console.log('Supported chains:', supportedChains.map(c => c.name));
  console.log('Is supported:', isSupported);

  return { chainId, isSupported };
}
