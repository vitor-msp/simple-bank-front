import { Account } from "../domain/Account";
import { Customer } from "../domain/Customer";

export interface IHttpGateway {
  postUser(input: Customer): Account;
}
