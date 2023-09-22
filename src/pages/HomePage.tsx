import { useNavigate } from "react-router-dom";
import { Balance } from "../components/Balance";
import { Transactions } from "../components/Transactions";

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
      <div className="flex justify-center items-center w-full gap-4 mt-4">
        <button
          type="button"
          onClick={credit}
          className="w-auto rounded-md transition-all bg-orange-500 py-2 px-4 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
        >
          credit
        </button>
        <button
          type="button"
          onClick={debit}
          className="w-auto rounded-md transition-all bg-orange-500 py-2 px-4 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
        >
          debit
        </button>
        <button
          type="button"
          onClick={transfer}
          className="w-auto rounded-md transition-all bg-orange-500 py-2 px-4 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
        >
          transfer
        </button>
      </div>
      <Balance />
      <Transactions />
    </div>
  );
};
