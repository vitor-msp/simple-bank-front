import { useContext, useEffect, useState } from "react";
import { Customer } from "../core/domain/Customer";
import { AccountContext } from "../context/AccountProvider";
import { Account } from "../core/domain/Account";
import { inactivateAccountUsecase } from "../factory";

let currentAccount: Account = {
  accountNumber: 0,
  createdAt: new Date(),
  owner: { name: "", cpf: "" },
};

export const MyAccountForm = () => {
  const [customer, setCustomer] = useState<Customer>(currentAccount.owner!);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    const account = accountContext.getAccount();
    if (account) {
      currentAccount = account;
      setCustomer(account.owner!);
    }
  }, []);

  const onChangeField = (event: any) => {
    setCustomer((c) => {
      return { ...c, name: event.target.value };
    });
  };

  const cancelEdit = () => {
    setCanEdit(false);
    setCustomer(currentAccount.owner!);
  };

  const updateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await accountContext.updateAccount(
      currentAccount.accountNumber!,
      customer
    );
    if (success) {
      currentAccount.owner = customer;
      setCanEdit(false);
      return;
    }
    alert("Error to update account!");
  };

  const inactivateAccount = async () => {
    const success = await inactivateAccountUsecase.execute(
      currentAccount.accountNumber!
    );
    if (success) {
      window.location.replace("/");
      return;
    }
    alert("Error to inactivate account!");
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">my account</h2>
      <form onSubmit={updateAccount}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              onChange={onChangeField}
              value={customer.name}
              disabled={!canEdit}
              className="p-1"
            />
          </div>
          <div>
            <label htmlFor="text">cpf</label>
            <input
              type="cpf"
              id="cpf"
              value={customer.cpf}
              disabled={true}
              className="p-1"
            />
          </div>
        </fieldset>
        {canEdit ? (
          <div className="flex justify-between items-center w-full gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              save
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full gap-2">
            <button
              type="button"
              onClick={() => setCanEdit(true)}
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              edit
            </button>
          </div>
        )}
      </form>
      <div className="flex justify-center items-center w-full gap-2 mt-4">
        <button
          type="button"
          onClick={inactivateAccount}
          className="px-4 w-auto rounded-md transition-all hover:bg-red-500 p-1 text-xl text-red-500 bg-red-200 hover:text-gray-100"
        >
          inactivate account
        </button>
      </div>
    </div>
  );
};
