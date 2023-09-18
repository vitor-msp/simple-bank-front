import { createUserUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const account = await createUserUsecase.execute({
            cpf: "0000",
            name: "fulano",
          });
          alert(JSON.stringify(account));
        }}
      >
        create user
      </button>
    </div>
  );
};
