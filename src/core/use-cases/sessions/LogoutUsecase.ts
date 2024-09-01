import { IHttpGateway } from "../../gateways/IHttpGateway";

export class LogoutUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<void> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await this.http.logout({
          accountNumber,
          refreshToken,
        });
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      alert(error);
    }
  }
}
