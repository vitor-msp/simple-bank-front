import { Account } from "../domain/Account";
import { Customer } from "../domain/Customer";

export interface IHttpGateway {
  postAccount(input: Customer): Account;
  getAccount(accountNumber: number): Account;
  putAccount(input: Customer): void;
  deleteAccount(accountNumber: number): void;
}
