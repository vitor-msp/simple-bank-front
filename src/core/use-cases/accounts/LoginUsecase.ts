import { LoginInput } from "../../domain/Login";
import { IHttpGateway } from "../../gateways/IHttpGateway";

export class LoginUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(input: LoginInput): Promise<boolean | null> {
    try {
      const output = await this.http.login(input);
      if (!output.accessToken || !output.refreshToken) return false;

      localStorage.setItem("accessToken", output.accessToken);
      localStorage.setItem("refreshToken", output.refreshToken);

      return true;
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
