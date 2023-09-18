import { Account } from "../core/domain/Account";
import { Customer } from "../core/domain/Customer";
import { IHttpGateway } from "../core/gateways/IHttpGateway";

export class HttpAdapter implements IHttpGateway {
  postAccount(input: Customer): Account {
    return { accountNumber: new Date().getTime() };
  }

  getAccount(accountNumber: number): Account {
    return {
      accountNumber: new Date().getTime(),
      createdAt: new Date(),
      owner: { cpf: "0000", name: "fulano" },
    };
  }

  putAccount(input: Customer): void {}

  deleteAccount(accountNumber: number): void {}
}
