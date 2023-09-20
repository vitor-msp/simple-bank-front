import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transferUsecase } from "../factory";
import { AccountContext } from "../context/AccountProvider";
import { PostTransferInput } from "../core/gateways/IHttpGateway";

const defaultTransfer: PostTransferInput = {
  value: 0,
  recipientAccountNumber: 0,
};

export const TransferForm = () => {
  const [transfer, setTransfer] = useState<PostTransferInput>(defaultTransfer);
  const navigate = useNavigate();
  const accountContext = useContext(AccountContext);

  const applyTransfer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const account = accountContext.getAccount();
    if (!account) return;
    const success = await transferUsecase.execute(
      account.accountNumber!,
      transfer
    );
    if (success) {
      navigate(`/home`);
      return;
    }
    alert("Error to apply transfer. Please, try again!");
  };

  const onChangeField = (event: any) => {
    setTransfer((t) => {
      return { ...t, [event.target.name]: event.target.value };
    });
  };

  const backToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>transfer</h2>
      <div>
        <button type="button" onClick={backToHome}>
          back
        </button>
      </div>
      <form onSubmit={applyTransfer}>
        <div>
          <label htmlFor="value">value</label>
          <input
            type="number"
            id="value"
            name="value"
            onChange={onChangeField}
            value={transfer.value}
            min={0}
            step={0.1}
          />
        </div>
        <div>
          <label htmlFor="recipientAccountNumber">recipientAccountNumber</label>
          <input
            type="text"
            id="recipientAccountNumber"
            name="recipientAccountNumber"
            onChange={onChangeField}
            value={transfer.recipientAccountNumber}
          />
        </div>
        <button type="submit">apply</button>
      </form>
    </div>
  );
};
