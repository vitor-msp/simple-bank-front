import { Account } from "../core/domain/Account";
import { Customer } from "../core/domain/Customer";
import { IHttpGateway } from "../core/gateways/IHttpGateway";

export class HttpAdapter implements IHttpGateway {
  postUser(input: Customer): Account {
    return { accountNumber: new Date().getTime() };
  }

  getUser(accountNumber: number): Account {
    return {
      accountNumber: new Date().getTime(),
      createdAt: new Date(),
      owner: { cpf: "0000", name: "fulano" },
    };
  }

  putUser(input: Customer): void {}

  deleteUser(accountNumber: number): void {}
}
