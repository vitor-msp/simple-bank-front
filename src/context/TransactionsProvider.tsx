import { PropsWithChildren, createContext, useState } from "react";
import { getBalanceUsecase } from "../factory";

export type TransactionsContextType = {
  getBalance: (accountNumber: number) => Promise<number | null>;
};

const defaultTransactionsContext: TransactionsContextType = {
  getBalance: async (accountNumber: number) => null,
};

export const TransactionsContext = createContext<TransactionsContextType>(
  defaultTransactionsContext
);

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = async (accountNumber: number) => {
    if (balance != null) return balance;
    const response = await getBalanceUsecase.execute(accountNumber);
    if (response == null) return null;
    setBalance(response.balance);
    return response.balance;
  };

  return (
    <TransactionsContext.Provider value={{ getBalance }}>
      {children}
    </TransactionsContext.Provider>
  );
};
