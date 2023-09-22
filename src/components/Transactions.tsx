import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import {
  AccountOutput,
  TransactionOutput,
} from "../core/gateways/IHttpGateway";
import { getTransactionsUsecase } from "../factory";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionOutput[]>([]);
  const accountContext = useContext(AccountContext);

  const getTransactions = async () => {
    const account = await accountContext.getAccount();
    if (!account) return;
    const response = await getTransactionsUsecase.execute(
      account.accountNumber!
    );
    if (response) setTransactions(response.transactions);
  };

  const getAccountData = (sender: AccountOutput, recipient: AccountOutput) => {
    const currentAccountNumber = accountContext.getAccount()!.accountNumber!;
    let msg: string = "",
      accountNumber: number = 0,
      name: string = "";
    if (currentAccountNumber === sender.accountNumber) {
      msg = "sended to >>";
      accountNumber = recipient.accountNumber;
      name = recipient.name;
    } else if (currentAccountNumber === recipient.accountNumber) {
      msg = "received from <<";
      accountNumber = sender.accountNumber;
      name = sender.name;
    }
    return (
      <div className="flex justify-center evenly items-center w-full gap-4 mt-4 p-4">
        <div>
          <span className="font-bold">{msg}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <span className="font-semibold">account number:</span>
            <span className="ml-2">{accountNumber}</span>
          </div>
          <div>
            <span className="font-semibold">name:</span>
            <span className="ml-2">{name}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      {transactions.length === 0 && (
        <div className="flex justify-center items-center w-full gap-4 mt-4">
          <button
            type="button"
            onClick={getTransactions}
            className="w-auto rounded-md transition-all hover:bg-orange-500 py-2 px-4 text-xl text-orange-500 bg-orange-200 hover:text-gray-100"
          >
            show transactions
          </button>
        </div>
      )}
      <div className="flex justify-center items-center w-full gap-4 mt-4">
        <ul className="w-3/5">
          {transactions.map((t) => {
            const { createdAt, type, value, recipient, sender } = t;
            return (
              <li
                key={Math.random()}
                className="rounded-md hover:bg-orange-200"
              >
                <div className="flex justify-evenly items-center w-full gap-4 mt-4 p-4">
                  <span className="font-bold">{type}</span>
                  <span
                    className={`font-bold ${
                      value.toString().includes("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {value}
                  </span>
                  <span>{createdAt.toDateString()}</span>
                </div>
                {sender && recipient && getAccountData(sender, recipient)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
