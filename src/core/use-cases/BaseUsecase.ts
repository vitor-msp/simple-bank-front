import { Headers } from "../domain/Headers";
import { IHttpGateway } from "../gateways/IHttpGateway";
import { UnauthorizedError } from "../UnauthorizedError";
import { Command } from "./Command";
import { ProcessLogout } from "./sessions/ProcessLogout";

export abstract class BaseUsecase {
  constructor(protected readonly http: IHttpGateway) {}

  getAuthorizationHeader(): Headers {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Session expired.");

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async refreshToken(accountNumber: number): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return false;

      const output = await this.http.refreshToken({
        accountNumber,
        refreshToken,
      });

      if (!output.accessToken) return false;
      localStorage.setItem("accessToken", output.accessToken);

      return true;
    } catch {
      return false;
    }
  }

  async logout(accountNumber: number): Promise<null> {
    alert("Session expired. Please, login again!");
    await ProcessLogout.execute(this.http, accountNumber);
    window.location.replace("/");
    return null;
  }

  async executeCommand(accountNumber: number, command: Command): Promise<any> {
    let errorCounter: number = 0;

    while (errorCounter < 2) {
      try {
        command.setHttp(this.http);
        command.setHeaders(this.getAuthorizationHeader());
        return await command.execute();
      } catch (error: any) {
        if (!(error instanceof UnauthorizedError)) {
          alert(error);
          return false;
        }
        errorCounter++;
        if (errorCounter >= 2) return this.logout(accountNumber);
        const tokenRefreshed = await this.refreshToken(accountNumber);
        if (!tokenRefreshed) return this.logout(accountNumber);
      }
    }

    return Promise.resolve(null);
  }
}
