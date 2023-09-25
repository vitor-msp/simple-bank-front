import { AccountOutput, IHttpGateway } from "../../gateways/IHttpGateway";

export class GetAccountsUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(): Promise<AccountOutput[]> {
    try {
      return await this.http.getAccounts();
    } catch (error) {
      alert(error);
      return [];
    }
  }
}
