import { debitUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const created = await debitUsecase.execute(123, { value: 15 });
          alert(JSON.stringify(created));
        }}
      >
        debit
      </button>
    </div>
  );
};
