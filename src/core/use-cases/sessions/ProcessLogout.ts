import { IHttpGateway } from "../../gateways/IHttpGateway";

export abstract class ProcessLogout {
  static async execute(
    http: IHttpGateway,
    accountNumber: number
  ): Promise<void> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await http.logout({
          accountNumber,
          refreshToken,
        });
      }
    } catch {
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
}
