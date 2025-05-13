import { sepolia } from '@/config/evm-chains';

export const CONTRACTS_ADDRESS = {
  [sepolia.id]: {
    ammExchange: '0x1e9aCdf380C6B279a43fB09c2cc527225D2E6a08',
    //ammExchange: '0xbdDa832E79acA473cb779b194bFa4a2D7ae92F27',
    marketMakerProxy: '0x01A75bBE6D0d687A6B1c2d58BfB9d064C8064bcf',
    //marketMakerProxy: '0xaa271Fa831caE56176eC26EdCF34e177f8BE1D0C',
    florinForwarder: '0xa4b5d94AFd1F9554EF64FC1Ff89336F8D3e10510',
    //florinForwarder: '0xA9274e1dB149ba154a165E6Dc1979f4CF128B664',
    erc20BitSnark: '0x45cb7F7fcEECde9d1E4AFF6C9dfc8df2743FED5D',
    //erc20BitSnark: '0xc341E4c88755150F0799e7b10C35b3a28BfA3D63',
    contractRegistry: '0xBAd480fD45fb6BF2560B365D1b684460E786a49d',
    //contractRegistry: '0x6b9dB8c3d74D0AF424E450Ab3b76D0E3578e29C6',
  },
  31337: {
    ammExchange: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    marketMakerProxy: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    florinForwarder: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    erc20BitSnark: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    contractRegistry: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  },
};
