import { useContext, useState } from "react";
import { Debit } from "../core/domain/Debit";
import { useNavigate } from "react-router-dom";
import { debitUsecase } from "../factory";
import { AccountContext } from "../context/AccountProvider";

const defaultDebit: Debit = { value: 0 };

export const DebitForm = () => {
  const [debit, setDebit] = useState<Debit>(defaultDebit);
  const navigate = useNavigate();
  const accountContext = useContext(AccountContext);

  const applyDebit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const account = accountContext.getAccount();
    if (!account) return;
    const success = await debitUsecase.execute(account.accountNumber!, debit);
    if (success) {
      navigate(`/home`);
      return;
    }
    alert("Error to apply debit. Please, try again!");
  };

  const onChangeField = (event: any) => {
    setDebit((c) => {
      return { ...c, value: event.target.value };
    });
  };

  return (
    <div>
      <h2>debit</h2>
      <form onSubmit={applyDebit}>
        <div>
          <label htmlFor="value">value</label>
          <input
            type="number"
            id="value"
            onChange={onChangeField}
            value={debit.value}
            min={0}
            step={0.1}
          />
        </div>
        <button type="submit">apply</button>
      </form>
    </div>
  );
};
