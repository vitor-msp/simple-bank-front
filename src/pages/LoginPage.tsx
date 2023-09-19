import { transferUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const created = await transferUsecase.execute(123, {
            value: 15,
            recipientAccountNumber: 321,
          });
          alert(JSON.stringify(created));
        }}
      >
        transfer
      </button>
    </div>
  );
};
