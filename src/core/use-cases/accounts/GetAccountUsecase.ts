import { Account } from "../../domain/Account";
import { BaseUsecase } from "../BaseUsecase";

export class GetAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<Account | null> {
    try {
      const headers = this.getAuthorizationHeader();
      return await this.http.getAccount(accountNumber, headers);
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
