import { getTransactionsUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const transactions = await getTransactionsUsecase.execute(123);
          alert(JSON.stringify(transactions));
        }}
      >
        get transactions
      </button>
    </div>
  );
};
