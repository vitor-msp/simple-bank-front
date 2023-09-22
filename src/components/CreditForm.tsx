import { useContext, useState } from "react";
import { Credit } from "../core/domain/Credit";
import { useNavigate } from "react-router-dom";
import { creditUsecase } from "../factory";
import { AccountContext } from "../context/AccountProvider";

const defaultCredit: Credit = { value: 0 };

export const CreditForm = () => {
  const [credit, setCredit] = useState<Credit>(defaultCredit);
  const navigate = useNavigate();
  const accountContext = useContext(AccountContext);

  const applyCredit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const account = accountContext.getAccount();
    if (!account) return;
    const success = await creditUsecase.execute(account.accountNumber!, credit);
    if (success) {
      navigate(`/home`);
      return;
    }
    alert("Error to apply credit. Please, try again!");
  };

  const onChangeField = (event: any) => {
    setCredit((c) => {
      return { ...c, value: event.target.value };
    });
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">credit</h2>
      <form onSubmit={applyCredit}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="value">value</label>
            <input
              type="number"
              id="value"
              onChange={onChangeField}
              value={credit.value}
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
