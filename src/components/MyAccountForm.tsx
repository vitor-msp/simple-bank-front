import { useContext, useEffect, useState } from "react";
import { Customer } from "../core/domain/Customer";
import { AccountContext } from "../context/AccountProvider";
import { Account } from "../core/domain/Account";

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
    alert("Error to save user data!");
  };

  return (
    <div>
      <h2>my account</h2>
      <form onSubmit={updateAccount}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            onChange={onChangeField}
            value={customer.name}
            disabled={!canEdit}
          />
        </div>
        <div>
          <label htmlFor="text">cpf</label>
          <input type="cpf" id="cpf" value={customer.cpf} disabled={true} />
        </div>
        {canEdit ? (
          <div>
            <button type="button" onClick={cancelEdit}>
              cancel
            </button>
            <button type="submit">save</button>
          </div>
        ) : (
          <>
            <button type="button" onClick={() => setCanEdit(true)}>
              edit
            </button>
          </>
        )}
      </form>
    </div>
  );
};
