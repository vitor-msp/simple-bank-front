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
  const [account, setAccount] = useState<Account>(currentAccount);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    const response = accountContext.getAccount();
    if (!response) return;
    currentAccount = response;
    setAccount(response);
  }, []);

  const onChangeField = (event: any) => {
    setAccount((a) => {
      const { owner } = a;
      return { ...a, owner: { ...owner, name: event.target.value } };
    });
  };

  const cancelEdit = () => {
    setCanEdit(false);
    setAccount(currentAccount);
  };

  const updateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await accountContext.updateAccount(
      currentAccount.accountNumber!,
      account.owner!
    );
    if (!success) return;
    currentAccount.owner = account.owner;
    setCanEdit(false);
  };

  const inactivateAccount = async () => {
    const success = await inactivateAccountUsecase.execute(
      currentAccount.accountNumber!
    );
    if (success) window.location.replace("/");
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">my account</h2>
      <form onSubmit={updateAccount}>
        <fieldset className="border border-blue-800 mb-1 p-3">
          <div>
            <label htmlFor="accountNumber">account number</label>
            <input
              type="text"
              id="accountNumber"
              value={account.accountNumber ?? ""}
              disabled={true}
              className="p-1"
            />
          </div>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              onChange={onChangeField}
              value={account.owner?.name ?? ""}
              disabled={!canEdit}
              className="p-1"
            />
          </div>
          <div>
            <label htmlFor="text">cpf</label>
            <input
              type="text"
              id="cpf"
              value={account.owner?.cpf ?? ""}
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
              className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
            >
              save
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full gap-2">
            <button
              type="button"
              onClick={() => setCanEdit(true)}
              className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
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
          className="px-4 w-auto rounded-md transition-all hover:bg-red-500 p-1 text-xl text-red-500 hover:text-gray-100"
        >
          inactivate account
        </button>
      </div>
    </div>
  );
};
