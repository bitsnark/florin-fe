import { createContext } from 'react';

export type WalletDialogContextType = {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  setOpen: (value: boolean) => void;
};

export const WalletDialogContext = createContext<
  WalletDialogContextType | undefined
>(undefined);
