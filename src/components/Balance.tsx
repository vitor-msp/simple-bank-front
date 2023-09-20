import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import { getBalanceUsecase } from "../factory";

export const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    (async () => {
      const account = await accountContext.getAccount();
      if (!account) return;
      const response = await getBalanceUsecase.execute(account.accountNumber!);
      if (response) setBalance(response.balance);
    })();
  }, []);

  return <div>Balance: {balance}</div>;
};
