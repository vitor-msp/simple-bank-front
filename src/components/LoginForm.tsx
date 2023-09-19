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
    <div>
      <h2>login</h2>
      <form onSubmit={login}>
        <div>
          <label htmlFor="accountNumber">accountNumber</label>
          <input
            type="text"
            id="accountNumber"
            onChange={onChangeField}
            value={accountNumber}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
