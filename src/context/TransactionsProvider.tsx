import { PropsWithChildren, createContext, useState } from "react";
import { getBalanceUsecase, getTransactionsUsecase } from "../factory";
import { TransactionOutput } from "../core/gateways/IHttpGateway";

export type TransactionsContextType = {
  getBalance: (accountNumber: number) => Promise<number | null>;
  getTransactions: (accountNumber: number) => Promise<TransactionOutput[]>;
};

const defaultTransactionsContext: TransactionsContextType = {
  getBalance: async (accountNumber: number) => null,
  getTransactions: async (accountNumber: number) => [],
};

export const TransactionsContext = createContext<TransactionsContextType>(
  defaultTransactionsContext
);

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionOutput[] | null>(
    null
  );

  const getBalance = async (accountNumber: number): Promise<number | null> => {
    if (balance != null) return balance;
    const response = await getBalanceUsecase.execute(accountNumber);
    if (response == null) return null;
    setBalance(response.balance);
    return response.balance;
  };

  const getTransactions = async (
    accountNumber: number
  ): Promise<TransactionOutput[]> => {
    if (transactions != null) return transactions;
    const response = await getTransactionsUsecase.execute(accountNumber);
    if (response == null) return [];
    setTransactions(response.transactions);
    return response.transactions;
  };

  return (
    <TransactionsContext.Provider value={{ getBalance, getTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
