import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Account } from "../core/domain/Account";
import { getAccountUsecase } from "../factory";

export type AccountContextType = {
  login: (accountNumber: number) => Promise<boolean>;
};

const defaultAccountContext: AccountContextType = {
  login: async (accountNumber: number) => false,
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

  return (
    <AccountContext.Provider value={{ login }}>
      {children}
    </AccountContext.Provider>
  );
};
