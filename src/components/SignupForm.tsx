import { useState } from "react";
import { Customer } from "../core/domain/Customer";
import { useNavigate } from "react-router-dom";
import { createAccountUsecase } from "../factory";

const defaultCustomer: Customer = {
  name: "",
  cpf: "",
};

export const SignupForm = () => {
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);
  const navigate = useNavigate();

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const account = await createAccountUsecase.execute(customer);
    if (account) {
      alert(JSON.stringify(account));
      navigate(`/login`);
      return;
    }
    alert("Error to sign up. Please, try again!");
  };

  const onChangeField = (event: any) => {
    setCustomer((c) => {
      return { ...c, [event.target.name]: event.target.value };
    });
  };

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={signUp}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={onChangeField}
            value={customer.name}
          />
        </div>
        <div>
          <label htmlFor="text">cpf</label>
          <input
            type="cpf"
            name="cpf"
            id="cpf"
            onChange={onChangeField}
            value={customer.cpf}
          />
        </div>
        <button type="submit">sign up</button>
      </form>
    </div>
  );
};
