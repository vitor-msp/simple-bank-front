import { Customer } from "../../domain/Customer";
import { IHttpGateway } from "../../gateways/IHttpGateway";

export class UpdateAccountUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number, input: Customer): Promise<boolean> {
    try {
      await this.http.putAccount(accountNumber, input);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
