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
import { TokenUtil } from "../core/utils/TokenUtil";
import { Role } from "../core/domain/Role";

export type AccountContextType = {
  init: () => Promise<boolean>;
  login: (loginInput: LoginInput) => Promise<boolean>;
  getAccount: () => Account | null;
  updateAccount: (accountNumber: number, input: Customer) => Promise<boolean>;
  isLoggedIn: boolean;
  role: Role | null;
  logout: () => Promise<void>;
};

const defaultAccountContext: AccountContextType = {
  init: async () => false,
  login: async (loginInput: LoginInput) => false,
  getAccount: () => null,
  updateAccount: async (accountNumber: number, input: Customer) => false,
  isLoggedIn: false,
  role: null,
  logout: async () => {},
};

export const AccountContext = createContext<AccountContextType>(
  defaultAccountContext
);

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const init = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }

    const role = TokenUtil.getRole(accessToken);
    if (!role) return false;

    if (role === Role.Customer) {
      const accountNumber = TokenUtil.getAccountNumber(accessToken);
      const account = await getAccountUsecase.execute(accountNumber);
      if (!account) return false;
      setAccount(account);
    }

    setIsLoggedIn(true);
    setRole(role);
    return true;
  };

  const login = async (loginInput: LoginInput) => {
    if (!loginInput.accountNumber) return false;

    const role = await loginUsecase.execute(loginInput);
    if (!role) return false;

    if (role === Role.Customer) {
      const account = await getAccountUsecase.execute(loginInput.accountNumber);
      if (!account) return false;
      setAccount(account);
    }

    setIsLoggedIn(true);
    setRole(role);
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

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setAccount(null);
    setRole(null);
    setIsLoggedIn(false);

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
        role,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
