import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountsUsecase, transferUsecase } from "../factory";
import { AccountContext } from "../context/AccountProvider";
import {
  AccountOutput,
  PostTransferInput,
} from "../core/gateways/IHttpGateway";

const defaultTransfer: PostTransferInput = {
  value: 0,
  recipientAccountNumber: 0,
};

export const TransferForm = () => {
  const [transfer, setTransfer] = useState<PostTransferInput>(defaultTransfer);
  const [accounts, setAccounts] = useState<AccountOutput[]>([]);
  const navigate = useNavigate();
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    (async () => {
      const myAccount = accountContext.getAccount();
      if (!myAccount) return;
      const response = await getAccountsUsecase.execute();
      const newAccounts = response.filter(
        ({ accountNumber }) => accountNumber !== myAccount.accountNumber
      );
      setAccounts(newAccounts);
    })();
  }, []);

  const applyTransfer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!IsFormValid()) {
      alert("accountNumber and value must be greater than zero.");
      return;
    }
    const account = accountContext.getAccount();
    if (!account) return;
    const success = await transferUsecase.execute(
      account.accountNumber!,
      transfer
    );
    if (success) {
      navigate(`/home`);
      return;
    }
    alert("Error to apply transfer. Please, try again!");
  };

  const IsFormValid = (): boolean => {
    return transfer.recipientAccountNumber > 0 && transfer.value > 0;
  };

  const onChangeField = (event: any) => {
    setTransfer((t) => {
      return { ...t, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">transfer</h2>
      <form onSubmit={applyTransfer}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="recipientAccountNumber">recipient account</label>
            <select
              id="recipientAccountNumber"
              name="recipientAccountNumber"
              onChange={onChangeField}
              required={true}
              className="p-1"
            >
              <option value={-1}>{"  -  "}</option>
              {accounts.map(({ accountNumber, name }) => {
                return (
                  <option key={accountNumber} value={accountNumber}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="value">value</label>
            <input
              type="number"
              id="value"
              name="value"
              onChange={onChangeField}
              value={transfer.value}
              min={0.01}
              step={0.01}
              required={true}
              className="p-1"
            />
          </div>
        </fieldset>
        <div className="flex justify-between items-center w-full gap-2">
          <button
            type="submit"
            className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
          >
            apply
          </button>
        </div>
      </form>
    </div>
  );
};
