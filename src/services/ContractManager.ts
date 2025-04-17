// src/core/ContractManager.ts

import {
  createPublicClient,
  createWalletClient,
  http,
  PublicClient,
  WalletClient,
} from 'viem';
import { getConnectorClient } from '@wagmi/core';
import { AMMEXCHANGE_ABI, ERC20_BITSNARK_ABI } from '@/constants/abis';
import { CMError, ContractError, parseContractError } from '@/lib/errors';
import { TransactionResponse } from '@/lib/types';
import { Address } from 'viem';
import { wagmiConfig } from '@/config/wagmi';
import { env } from '@/config/env';

export class ContractManager {
  private static instance: ContractManager | null = null;
  private static initializing = false;

  public publicClient!: PublicClient;
  public walletClient?: WalletClient;
  private contracts: Map<string, { abi: any[] }> = new Map();

  private constructor() {}

  public static async getInstance(): Promise<ContractManager> {
    if (this.instance) return this.instance;

    if (this.initializing) {
      // wait for initializing to finish
      while (!this.instance) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return this.instance;
    }

    this.initializing = true;
    const instance = new ContractManager();

    const connectorClient = await getConnectorClient(wagmiConfig);
    instance.publicClient = createPublicClient({
      chain: connectorClient.chain,
      transport: http(),
    });

    if (connectorClient) {
      try {
        instance.walletClient = createWalletClient({
          account: connectorClient.account,
          chain: connectorClient.chain,
          transport: http(env.VITE_RPC_URL),
        });
      } catch (error) {
        console.error('Error creating wallet client:', error);
      }
    }

    instance.registerContract('AMMExchange', AMMEXCHANGE_ABI);
    instance.registerContract('ERC20BitSnark', ERC20_BITSNARK_ABI);
    this.instance = instance;
    this.initializing = false;

    return instance;
  }

  public registerContract(contractName: string, abi: any[]) {
    this.contracts.set(contractName, { abi });
  }

  public async readContract(
    contractName: string,
    method: string,
    args: any[] = [],
    address: Address
  ) {
    try {
      const abi = this.getABI(contractName);
      const result = await this.publicClient.readContract({
        address,
        abi,
        functionName: method,
        args,
      });
      return result;
    } catch (error) {
      const parsed = parseContractError(error);
      throw new ContractError(
        `Failed to write to contract ${contractName}: ${parsed}`
      );
    }
  }

  public async refreshWalletClient(): Promise<void> {
    const connectorClient = await getConnectorClient(wagmiConfig);
    if (connectorClient) {
      this.walletClient = createWalletClient({
        account: connectorClient.account,
        chain: connectorClient.chain,
        transport: http(env.VITE_RPC_URL),
      });
    }
  }

  public async writeContract(
    contractName: string,
    method: string,
    args: any[] = [],
    address: Address,
    options?: { value?: bigint }
  ): Promise<TransactionResponse> {
    if (!this.walletClient) {
      throw new CMError('Signer is required to perform write operations');
    }

    try {
      const abi = this.getABI(contractName);

      const { request } = await this.publicClient.simulateContract({
        address,
        abi,
        functionName: method,
        args,
        account: this.walletClient.account,
        value: options?.value || 0n,
      });

      const txRequest = {
        ...request,
        ...options,
      };

      const hash = await this.walletClient.writeContract(txRequest);

      return {
        hash,
        wait: async () => {
          const receipt = await this.publicClient.waitForTransactionReceipt({
            hash,
            confirmations: 1, 
          });
          return receipt;
        },
      };
    } catch (error) {
      const parsed = parseContractError(error);
      throw new ContractError(
        `Failed to write to contract ${contractName}: ${parsed}`
      );
    }
  }

  private getABI(contractName: string): any[] {
    const contract = this.contracts.get(contractName);
    if (!contract) {
      throw new Error(`ABI for contract ${contractName} is not registered`);
    }
    return contract.abi;
  }

  public async signTypedData<T extends Record<string, any>>(params: {
    domain: Record<string, any>;
    types: Record<string, any>;
    primaryType: string;
    message: T;
  }): Promise<`0x${string}`> {
    if (!this.walletClient?.account) {
      throw new CMError('Wallet client not initialized');
    }

    return await this.walletClient.signTypedData({
      account: this.walletClient.account,
      domain: {
        ...params.domain,
        chainId: this.walletClient.chain?.id,
      },
      types: params.types,
      primaryType: params.primaryType,
      message: params.message,
    });
  }

  public getRSV(signature: `0x${string}`) {
    const r = signature.slice(0, 66) as `0x${string}`;
    const s = ('0x' + signature.slice(66, 130)) as `0x${string}`;
    const v = parseInt(signature.slice(130, 132), 16);
    return { r, s, v };
  }
}
