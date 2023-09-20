import { PropsWithChildren, createContext, useState } from "react";
import { Account } from "../core/domain/Account";
import { getAccountUsecase, updateAccountUsecase } from "../factory";
import { Customer } from "../core/domain/Customer";

export type AccountContextType = {
  login: (accountNumber: number) => Promise<boolean>;
  getAccount: () => Account | null;
  updateAccount: (accountNumber: number, input: Customer) => Promise<boolean>;
  isLoggedIn: boolean;
  logout: () => void;
};

const defaultAccountContext: AccountContextType = {
  login: async (accountNumber: number) => false,
  getAccount: () => null,
  updateAccount: async (accountNumber: number, input: Customer) => false,
  isLoggedIn: false,
  logout: () => {},
};

export const AccountContext = createContext<AccountContextType>(
  defaultAccountContext
);

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);

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

  const logout = () => {
    window.location.replace("/");
  };

  return (
    <AccountContext.Provider
      value={{
        login,
        getAccount,
        updateAccount,
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
