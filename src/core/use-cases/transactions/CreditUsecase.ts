import { Credit } from "../../domain/Credit";
import { BaseUsecase } from "../BaseUsecase";

export class CreditUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Credit): Promise<boolean> {
    try {
      const headers = this.getAuthorizationHeader();
      await this.http.postCredit(accountNumber, input, headers);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
