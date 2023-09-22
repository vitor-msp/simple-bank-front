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
    setDebit((d) => {
      return { ...d, value: event.target.value };
    });
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">debit</h2>
      <form onSubmit={applyDebit}>
        <fieldset className="border border-blue-800 mb-1 p-3">
          <div>
            <label htmlFor="value">value</label>
            <input
              type="number"
              id="value"
              onChange={onChangeField}
              value={debit.value}
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
            className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
          >
            apply
          </button>
        </div>
      </form>
    </div>
  );
};
