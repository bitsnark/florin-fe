import { sepolia } from '@/config/evm-chains';

export const CONTRACTS_ADDRESS = {
  [sepolia.id]: {
    ammExchange: '0x106F56E4E0D457a4E26fe11831A5e84a4636607B',
    marketMakerProxy: '0xaa271Fa831caE56176eC26EdCF34e177f8BE1D0C',
    florinForwarder: '0xA9274e1dB149ba154a165E6Dc1979f4CF128B664',
    erc20BitSnark: '0xEc4824D3Ab3dFaff6f64af78ae6DF6FeC229683c',
    contractRegistry: '0x6b9dB8c3d74D0AF424E450Ab3b76D0E3578e29C6',
  },
  31337: {
    ammExchange: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    marketMakerProxy: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    florinForwarder: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    erc20BitSnark: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    contractRegistry: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  },
};
