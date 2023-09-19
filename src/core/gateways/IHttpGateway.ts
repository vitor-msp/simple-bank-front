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

export type GetTransactionsOutput = {
  transactions: CreditDebitIntern | TransferIntern[];
};

type TransactionType = "credit" | "debit" | "transfer";

type CreditDebitIntern = {
  type: TransactionType;
  value: number;
  createdAt: Date;
};

type TransferIntern = {
  type: TransactionType;
  value: number;
  createdAt: Date;
  sender: AccountIntern;
  recipient: AccountIntern;
};

type AccountIntern = {
  accountNumber: number;
  name: string;
};

export interface IHttpGateway {
  postAccount(input: Customer): Account;
  getAccount(accountNumber: number): Account;
  putAccount(accountNumber: number, input: Customer): void;
  deleteAccount(accountNumber: number): void;
  postCredit(accountNumber: number, input: Credit): void;
  postDebit(accountNumber: number, input: Debit): void;
  postTransfer(accountNumber: number, input: PostTransferInput): void;
  getBalance(accountNumber: number): GetBalanceOutput;
  getTransactions(accountNumber: number): GetTransactionsOutput;
}
