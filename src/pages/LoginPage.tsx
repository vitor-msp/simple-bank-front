import { inactivateUserUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const inactivated = await inactivateUserUsecase.execute(123);
          alert(JSON.stringify(inactivated));
        }}
      >
        inactivate user
      </button>
    </div>
  );
};
