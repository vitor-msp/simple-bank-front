import { Account } from "../domain/Account";
import { Customer } from "../domain/Customer";
import { IHttpGateway } from "../gateways/IHttpGateway";

export class CreateUserUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(input: Customer): Promise<Account | null> {
    try {
      return await this.http.postUser(input);
    } catch (error) {
      return null;
    }
  }
}
