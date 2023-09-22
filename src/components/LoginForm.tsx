import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountProvider";

export const LoginForm = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const navigate = useNavigate();

  const accountContext = useContext(AccountContext);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await accountContext.login(+accountNumber);
    if (success) {
      navigate(`/home`);
      return;
    }
    alert("Error to login. Please, try again!");
  };

  const onChangeField = (event: any) => {
    setAccountNumber(event.target.value);
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">login</h2>
      <form onSubmit={login}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="accountNumber">account number</label>
            <input
              type="text"
              id="accountNumber"
              onChange={onChangeField}
              value={accountNumber}
              className="p-1"
            />
          </div>
        </fieldset>
        <div className="flex justify-between items-center w-full gap-2">
          <button
            type="submit"
            className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};
