import { useNavigate } from "react-router-dom";
import { Balance } from "../components/Balance";

export const HomePage = () => {
  const navigate = useNavigate();

  const credit = () => {
    navigate("/credit");
  };

  const debit = () => {
    navigate("/debit");
  };

  const transfer = () => {
    navigate("/transfer");
  };

  return (
    <div>
      <div>
        <button type="button" onClick={credit}>
          credit
        </button>
        <button type="button" onClick={debit}>
          debit
        </button>
        <button type="button" onClick={transfer}>
          transfer
        </button>
      </div>
      <Balance />
    </div>
  );
};
