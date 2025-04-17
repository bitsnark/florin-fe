import { WalletDialogContext } from "@/context/walletDialogContext";
import { useContext } from "react";

export const useWalletDialog = () => {
 const context = useContext(WalletDialogContext);
 if (!context) {
   throw new Error('useWalletDialog debe usarse dentro de WalletDialogProvider');
 }
 return context;
};