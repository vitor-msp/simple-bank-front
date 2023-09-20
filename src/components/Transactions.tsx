import { useContext, useState } from "react";
import { TransactionsContext } from "../context/TransactionsProvider";
import { AccountContext } from "../context/AccountProvider";
import {
  TransactionAccountOutput,
  TransactionOutput,
} from "../core/gateways/IHttpGateway";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionOutput[]>([]);
  const accountContext = useContext(AccountContext);
  const transactionsContext = useContext(TransactionsContext);

  const getTransactions = async () => {
    const account = await accountContext.getAccount();
    if (!account) return;
    const response = await transactionsContext.getTransactions(
      account.accountNumber!
    );
    setTransactions(response);
  };

  const getSender = (sender: TransactionAccountOutput) => {
    const { accountNumber, name } = sender;
    return (
      <div>
        <div>
          <span>sender</span>
        </div>
        <div>
          <span>accountNumber:</span>
          <span>{accountNumber}</span>
        </div>
        <div>
          <span>name:</span>
          <span>{name}</span>
        </div>
      </div>
    );
  };

  const getRecipient = (recipient: TransactionAccountOutput) => {
    const { accountNumber, name } = recipient;
    return (
      <div>
        <div>
          <span>recipient</span>
        </div>
        <div>
          <span>accountNumber:</span>
          <span>{accountNumber}</span>
        </div>
        <div>
          <span>name:</span>
          <span>{name}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button type="button" onClick={getTransactions}>
          get transactions
        </button>
      </div>
      <div>
        <ul>
          {transactions.map((t) => {
            const { createdAt, type, value, recipient, sender } = t;
            return (
              <li>
                <div>
                  <strong>{type}</strong>
                </div>
                <div>
                  <span>
                    {value.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div>
                  <span>createdAt:</span>
                  <span>{createdAt.toISOString()}</span>
                </div>
                {sender && getSender(sender)}
                {recipient && getRecipient(recipient)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
