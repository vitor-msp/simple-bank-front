import { Account } from "../core/domain/Account";
import { Customer } from "../core/domain/Customer";
import { IHttpGateway } from "../core/gateways/IHttpGateway";

export class HttpAdapter implements IHttpGateway {
  postUser(input: Customer): Account {
    return { accountNumber: new Date().getTime() };
  }
}
