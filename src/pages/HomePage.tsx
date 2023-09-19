import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigator = useNavigate();

  const credit = () => {
    navigator("/credit");
  };

  const debit = () => {
    navigator("/debit");
  };

  const transfer = () => {
    navigator("/transfer");
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
