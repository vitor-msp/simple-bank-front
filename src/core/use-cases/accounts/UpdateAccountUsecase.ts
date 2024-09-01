import { Customer } from "../../domain/Customer";
import { BaseUsecase } from "../BaseUsecase";

export class UpdateAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Customer): Promise<boolean> {
    try {
      const headers = this.getAuthorizationHeader();
      await this.http.putAccount(accountNumber, input, headers);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
