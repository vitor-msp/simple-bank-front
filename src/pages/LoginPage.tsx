import { updateUserUsecase } from "../factory";

export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={async () => {
          const udpated = await updateUserUsecase.execute({
            name: "fulano de tal",
          });
          alert(JSON.stringify(udpated));
        }}
      >
        update user
      </button>
    </div>
  );
};
