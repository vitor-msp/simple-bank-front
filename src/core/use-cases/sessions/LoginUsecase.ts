import { LoginInput } from "../../domain/Login";
import { Role } from "../../domain/Role";
import { IHttpGateway } from "../../gateways/IHttpGateway";
import { TokenUtil } from "../../utils/TokenUtil";

export class LoginUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(input: LoginInput): Promise<Role | null> {
    try {
      const output = await this.http.login(input);
      if (!output.accessToken || !output.refreshToken) return null;

      const role = TokenUtil.getRole(output.accessToken);
      if (!role) return null;

      localStorage.setItem("accessToken", output.accessToken);
      localStorage.setItem("refreshToken", output.refreshToken);

      return role;
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
