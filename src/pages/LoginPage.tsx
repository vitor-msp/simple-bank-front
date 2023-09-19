import { getBalanceUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const balance = await getBalanceUsecase.execute(123);
          alert(JSON.stringify(balance));
        }}
      >
        balance
      </button>
    </div>
  );
};
