import { Account } from "../domain/Account";
import { Credit } from "../domain/Credit";
import { Customer } from "../domain/Customer";
import { Debit } from "../domain/Debit";

export interface IHttpGateway {
  postAccount(input: Customer): Account;
  getAccount(accountNumber: number): Account;
  putAccount(input: Customer): void;
  deleteAccount(accountNumber: number): void;
  postCredit(accountNumber: number, input: Credit): void;
  postDebit(accountNumber: number, input: Debit): void;
}
