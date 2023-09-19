import { creditUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const created = await creditUsecase.execute(123, { value: 15 });
          alert(JSON.stringify(created));
        }}
      >
        credit
      </button>
    </div>
  );
};
