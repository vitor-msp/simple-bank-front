import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

export const Logout = () => {
  const accountContext = useContext(AccountContext);

  const logout = () => {
    accountContext.logout();
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
    >
      logout
    </button>
  );
};
