import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Account } from "../core/domain/Account";
import { getAccountUsecase, updateAccountUsecase } from "../factory";
import { Customer } from "../core/domain/Customer";

export type AccountContextType = {
  login: (accountNumber: number) => Promise<boolean>;
  getAccount: () => Account | null;
  updateAccount: (accountNumber: number, input: Customer) => Promise<boolean>;
};

const defaultAccountContext: AccountContextType = {
  login: async (accountNumber: number) => false,
  getAccount: () => null,
  updateAccount: async (accountNumber: number, input: Customer) => false,
};

export const AccountContext = createContext<AccountContextType>(
  defaultAccountContext
);

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    alert("account " + JSON.stringify(account));
    alert("isLoggedIn " + isLoggedIn);
  }, [account, isLoggedIn]);

  const login = async (accountNumber: number) => {
    const account = await getAccountUsecase.execute(accountNumber);
    if (account) {
      setIsLoggedIn(true);
      setAccount(account);
      return true;
    }
    return false;
  };

  const getAccount = (): Account | null => {
    if (isLoggedIn && account) return account;
    return null;
  };

  const updateAccount = async (accountNumber: number, input: Customer) => {
    const success = await updateAccountUsecase.execute(accountNumber, input);
    if (success)
      setAccount((a) => {
        return { ...a, owner: input };
      });
    return success;
  };

  return (
    <AccountContext.Provider value={{ login, getAccount, updateAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
