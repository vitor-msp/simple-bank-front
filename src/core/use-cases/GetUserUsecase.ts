import { Account } from "../domain/Account";
import { IHttpGateway } from "../gateways/IHttpGateway";

export class GetUserUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<Account | null> {
    try {
      return await this.http.getUser(accountNumber);
    } catch (error) {
      return null;
    }
  }
}
