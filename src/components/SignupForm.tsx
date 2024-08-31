import { useState } from "react";
import { Customer } from "../core/domain/Customer";
import { useNavigate } from "react-router-dom";
import { createAccountUsecase } from "../factory";

const defaultCustomer: Customer = {
  name: "",
  cpf: "",
  password: "",
  passwordConfirmation: "",
};

export const SignupForm = () => {
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);
  const navigate = useNavigate();

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!passwordIsValid())
      return alert("Password and confirmation must be equal.");

    const account = await createAccountUsecase.execute(customer);
    if (!account) return;
    alert(JSON.stringify(account));
    navigate(`/login`);
  };

  const passwordIsValid = (): boolean => {
    return customer.password === customer.passwordConfirmation;
  };

  const onChangeField = (event: any) => {
    setCustomer((c) => {
      return { ...c, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">sign up</h2>
      <form onSubmit={signUp}>
        <fieldset className="border border-blue-800 mb-1 p-3">
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={onChangeField}
              value={customer.name}
              className="p-1"
            />
          </div>

          <div>
            <label htmlFor="text">cpf</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              onChange={onChangeField}
              value={customer.cpf}
              className="p-1"
            />
          </div>

          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChangeField}
              value={customer.password}
              className="p-1"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation">confirmation</label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              onChange={onChangeField}
              value={customer.passwordConfirmation}
              className="p-1"
            />
          </div>
        </fieldset>
        <div className="flex justify-between items-center w-full gap-2">
          <button
            type="submit"
            className="bg-blue-800 p-1 text-xl hover:font-bold hover:bg-blue-600 text-gray-100"
          >
            sign up
          </button>
        </div>
      </form>
    </div>
  );
};
