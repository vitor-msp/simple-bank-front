import { Credit } from "../../domain/Credit";
import { IHttpGateway } from "../../gateways/IHttpGateway";

export class CreditUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number, input: Credit): Promise<boolean> {
    try {
      await this.http.postCredit(accountNumber, input);
      return true;
    } catch (error) {
      return false;
    }
  }
}
