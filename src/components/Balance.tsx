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

  return (
    <div className="flex justify-center my-6">
      <span className="text-3xl">Balance:</span>
      <span className="text-3xl mx-2 text-orange-500 font-bold">
        {balance.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
};
