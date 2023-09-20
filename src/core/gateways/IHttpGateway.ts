import { Account } from "../domain/Account";
import { Credit } from "../domain/Credit";
import { Customer } from "../domain/Customer";
import { Debit } from "../domain/Debit";

export type PostTransferInput = {
  value: number;
  recipientAccountNumber: number;
};

export type GetBalanceOutput = {
  balance: number;
};

export type GetAccountsOutput = {
  accounts: AccountOutput[];
};

export type AccountOutput = {
  accountNumber: number;
  name: string;
};

export type GetTransactionsOutput = {
  transactions: TransactionOutput[];
};

export type TransactionOutput = {
  type: TransactionType;
  value: number;
  createdAt: Date;
  sender?: AccountOutput;
  recipient?: AccountOutput;
};

type TransactionType = "credit" | "debit" | "transfer";

export interface IHttpGateway {
  postAccount(input: Customer): Account;
  getAccount(accountNumber: number): Account;
  getAccounts(): AccountOutput[];
  putAccount(accountNumber: number, input: Customer): void;
  deleteAccount(accountNumber: number): void;
  postCredit(accountNumber: number, input: Credit): void;
  postDebit(accountNumber: number, input: Debit): void;
  postTransfer(accountNumber: number, input: PostTransferInput): void;
  getBalance(accountNumber: number): GetBalanceOutput;
  getTransactions(accountNumber: number): GetTransactionsOutput;
}
