import { PropsWithChildren, createContext, useState } from "react";
import { Account } from "../core/domain/Account";
import {
  getAccountUsecase,
  loginUsecase,
  logoutUsecase,
  updateAccountUsecase,
} from "../factory";
import { Customer } from "../core/domain/Customer";
import { LoginInput } from "../core/domain/Login";
import { TokenUtil } from "../utils/TokenUtil";

export type AccountContextType = {
  init: () => Promise<boolean>;
  login: (loginInput: LoginInput) => Promise<boolean>;
  getAccount: () => Account | null;
  updateAccount: (accountNumber: number, input: Customer) => Promise<boolean>;
  isLoggedIn: boolean;
  logout: () => void;
};

const defaultAccountContext: AccountContextType = {
  init: async () => false,
  login: async (loginInput: LoginInput) => false,
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

  const init = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }

    const accountNumber = TokenUtil.getAccountNumber(accessToken);
    const account = await getAccountUsecase.execute(accountNumber);
    if (!account) return false;

    setIsLoggedIn(true);
    setAccount(account);
    return true;
  };

  const login = async (loginInput: LoginInput) => {
    if (!loginInput.accountNumber) return false;

    const logged = await loginUsecase.execute(loginInput);
    if (!logged) return false;

    const account = await getAccountUsecase.execute(loginInput.accountNumber);
    if (!account) return false;

    setIsLoggedIn(true);
    setAccount(account);
    return true;
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

  const logout = async () => {
    if (account?.accountNumber)
      await logoutUsecase.execute(account.accountNumber);
    window.location.replace("/");
  };

  return (
    <AccountContext.Provider
      value={{
        init,
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
