import { Customer } from "../domain/Customer";
import { IHttpGateway } from "../gateways/IHttpGateway";

export class UpdateUserUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(input: Customer): Promise<boolean> {
    try {
      await this.http.putUser(input);
      return true;
    } catch (error) {
      return false;
    }
  }
}
