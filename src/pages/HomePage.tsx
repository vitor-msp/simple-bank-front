import { useNavigate } from "react-router-dom";

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
  );
};
