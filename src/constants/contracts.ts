import { sepolia } from '@/config/evm-chains';

export const CONTRACTS_ADDRESS = {
  [sepolia.id]: {
    ammExchange: '0x467221C833a4eE1417E9a7F29616fd3a1ceCA83d',
    marketMakerProxy: '0xE3361d8C4cbb7adC7f514b52b122456F68cD0189',
    florinForwarder: '0x1D8D195A3261A9226aeC55a91ecC7683f802B183',
    erc20BitSnark: '0x33D5ae0bBbDE329D7Ee8A1fA8Fcc308a2f4b4b9C',
    contractRegistry: '0xd2C37d96037be41a48Cf19d529c35C1a4f47888D',
  },
  31337: {
    ammExchange: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    marketMakerProxy: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    florinForwarder: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    erc20BitSnark: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    contractRegistry: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  },
};
