import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

export const Logout = () => {
  const accountContext = useContext(AccountContext);

  const logout = () => {
    accountContext.logout();
  };

  return (
    <button type="button" onClick={logout}>
      logout
    </button>
  );
};
