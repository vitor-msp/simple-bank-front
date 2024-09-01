import { BaseUsecase } from "../BaseUsecase";

export class InactivateAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<boolean> {
    try {
      const headers = this.getAuthorizationHeader();
      await this.http.deleteAccount(accountNumber, headers);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
