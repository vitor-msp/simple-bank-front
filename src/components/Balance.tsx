import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../context/TransactionsProvider";
import { AccountContext } from "../context/AccountProvider";

export const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const accountContext = useContext(AccountContext);
  const transactionsContext = useContext(TransactionsContext);

  useEffect(() => {
    (async () => {
      const account = await accountContext.getAccount();
      if (!account) return;
      const response = await transactionsContext.getBalance(
        account.accountNumber!
      );
      if (response != null) setBalance(response);
    })();
  }, []);

  return <div>Balance: {balance}</div>;
};
