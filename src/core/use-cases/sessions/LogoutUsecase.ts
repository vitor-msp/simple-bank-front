import { IHttpGateway } from "../../gateways/IHttpGateway";
import { ProcessLogout } from "./ProcessLogout";

export class LogoutUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<void> {
    return await ProcessLogout.execute(this.http, accountNumber);
  }
}
