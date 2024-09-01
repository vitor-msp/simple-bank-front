import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountProvider";
import { LoginInput } from "../core/domain/Login";

const defaultLogin: LoginInput = {
  accountNumber: undefined,
  password: "",
};

export const LoginForm = () => {
  const [loginInput, setLoginInput] = useState<LoginInput>(defaultLogin);
  const navigate = useNavigate();

  const accountContext = useContext(AccountContext);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await accountContext.login(loginInput);
    if (success) navigate(`/home`);
  };

  const onChangeField = (event: any) => {
    setLoginInput((l) => {
      return { ...l, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">login</h2>

      <form onSubmit={login}>
        <fieldset className="border border-blue-800 mb-1 p-3">
          <div>
            <label htmlFor="accountNumber">account number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              onChange={onChangeField}
              value={loginInput.accountNumber}
              className="p-1"
            />
          </div>

          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChangeField}
              value={loginInput.password}
              className="p-1"
            />
          </div>
        </fieldset>

        <div className="flex justify-between items-center w-full gap-2">
          <button
            type="submit"
            className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};
