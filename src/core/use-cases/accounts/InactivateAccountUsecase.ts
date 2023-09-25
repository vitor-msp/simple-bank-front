import { IHttpGateway } from "../../gateways/IHttpGateway";

export class InactivateAccountUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<boolean> {
    try {
      await this.http.deleteAccount(accountNumber);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
