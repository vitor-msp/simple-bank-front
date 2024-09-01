import { Debit } from "../../domain/Debit";
import { BaseUsecase } from "../BaseUsecase";

export class DebitUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Debit): Promise<boolean> {
    try {
      const headers = this.getAuthorizationHeader();
      await this.http.postDebit(accountNumber, input, headers);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
