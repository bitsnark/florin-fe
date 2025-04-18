// src/context/WalletDialogContext.tsx
import { createContext, useState, ReactNode, useCallback } from 'react';

type WalletDialogContextType = {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  setOpen: (value: boolean) => void;
};

export const WalletDialogContext = createContext<
  WalletDialogContextType | undefined
>(undefined);

export const WalletDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <WalletDialogContext.Provider
      value={{ open, openDialog, closeDialog, setOpen }}
    >
      {children}
    </WalletDialogContext.Provider>
  );
};
