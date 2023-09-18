import { inactivateAccountUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const inactivated = await inactivateAccountUsecase.execute(123);
          alert(JSON.stringify(inactivated));
        }}
      >
        inactivate account
      </button>
    </div>
  );
};
