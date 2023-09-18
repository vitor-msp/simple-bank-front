import { Account } from "../../domain/Account";
import { IHttpGateway } from "../../gateways/IHttpGateway";

export class GetAccountUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<Account | null> {
    try {
      return await this.http.getAccount(accountNumber);
    } catch (error) {
      return null;
    }
  }
}
