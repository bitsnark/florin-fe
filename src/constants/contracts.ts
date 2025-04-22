import { sepolia } from '@/config/evm-chains';
/*
sepolia
BitcoinOracleModule#BitcoinOracle - 0x80446Eeb36dA0e73a1a07e21Bff2dA7F93F268a4
ContractRegistryModule#ContractRegistry - 0x814bF9AA6aeA8261Cb0BC13E9c6cD93a11Ed7314
FlorinAMMDeployment#ERC20BitSnark - 0x91a3B86eB4be312F27d259d5cd1c87f91f0BB3cD
FlorinAMMDeployment#FlorinForwarder - 0xf2A168B51FCed5C93F1bF337F2134a80fC194b24
FlorinAMMDeployment#AMMExchange - 0xb75e1D7D63644776FebE7A995C30D7CcC8B02F23
FlorinAMMDeployment#MarketMakerProxy - 0x7702C4E5b85F7A96d751691bc88451C44110c1a7


localhost
BitcoinOracleModule#BitcoinOracle - 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
ContractRegistryModule#ContractRegistry - 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318
FlorinAMMDeployment#ERC20BitSnark - 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
FlorinAMMDeployment#FlorinForwarder - 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e
FlorinAMMDeployment#AMMExchange - 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82
FlorinAMMDeployment#MarketMakerProxy - 0x9A676e781A523b5d0C0e43731313A708CB607508

*/


export const CONTRACTS_ADDRESS = {
  [sepolia.id]: {
    ammExchange: '0xb75e1D7D63644776FebE7A995C30D7CcC8B02F23',
    marketMakerProxy: '0x7702C4E5b85F7A96d751691bc88451C44110c1a7',
    florinForwarder: '0xf2A168B51FCed5C93F1bF337F2134a80fC194b24',
    erc20BitSnark: '0x91a3B86eB4be312F27d259d5cd1c87f91f0BB3cD',
    contractRegistry: '0x814bF9AA6aeA8261Cb0BC13E9c6cD93a11Ed7314',
  },
  31337: {
    ammExchange: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    marketMakerProxy: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    florinForwarder: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    erc20BitSnark: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    contractRegistry: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  },
};
