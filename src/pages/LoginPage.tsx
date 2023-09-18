import { getUserUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const account = await getUserUsecase.execute(123);
          alert(JSON.stringify(account));
        }}
      >
        get user
      </button>
    </div>
  );
};
