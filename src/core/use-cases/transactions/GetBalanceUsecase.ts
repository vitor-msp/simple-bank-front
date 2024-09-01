import { GetBalanceOutput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";

export class GetBalanceUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<GetBalanceOutput | null> {
    try {
      const headers = this.getAuthorizationHeader();
      return await this.http.getBalance(accountNumber, headers);
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
