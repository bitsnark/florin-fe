// src/context/WalletDialogContext.tsx
import { useState, ReactNode, useCallback } from 'react';
import {
  WalletDialogContext,
  WalletDialogContextType,
} from './walletDialogContext-instance';

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

export type { WalletDialogContextType };
