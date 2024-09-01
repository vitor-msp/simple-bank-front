import { GetTransactionsOutput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";

export class GetTransactionsUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<GetTransactionsOutput | null> {
    try {
      const headers = this.getAuthorizationHeader();
      return await this.http.getTransactions(accountNumber, headers);
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
