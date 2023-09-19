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
    <div>
      <h2>credit</h2>
      <form onSubmit={applyCredit}>
        <div>
          <label htmlFor="value">value</label>
          <input
            type="number"
            id="value"
            onChange={onChangeField}
            value={credit.value}
            min={0}
            step={0.1}
          />
        </div>
        <button type="submit">apply</button>
      </form>
    </div>
  );
};
