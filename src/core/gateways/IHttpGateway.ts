import { Account } from "../domain/Account";
import { Credit } from "../domain/Credit";
import { Customer } from "../domain/Customer";
import { Debit } from "../domain/Debit";
import { Headers } from "../domain/Headers";
import { LoginInput, LoginOutput } from "../domain/Login";
import { LogoutInput } from "../domain/Logout";
import { RefreshTokenInput, RefreshTokenOutput } from "../domain/RefreshToken";

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

export type PostAccountOutput = {
  accountNumber: number;
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

export type GetTransactionsOutputApi = {
  statement: {
    transactions: TransactionOutputApi[];
  };
};

export type TransactionOutputApi = {
  type: TransactionType;
  creditDto?: {
    value: number;
    createdAt: Date;
    account: AccountOutput;
  };
  debitDto?: {
    value: number;
    createdAt: Date;
    account: AccountOutput;
  };
  transferDto?: {
    value: number;
    createdAt: Date;
    sender: AccountOutput;
    recipient: AccountOutput;
  };
};

type TransactionType = "Credit" | "Debit" | "Transfer";

export interface IHttpGateway {
  login(input: LoginInput): Promise<LoginOutput>;
  logout(input: LogoutInput): Promise<void>;
  refreshToken(input: RefreshTokenInput): Promise<RefreshTokenOutput>;
  postAccount(input: Customer): Promise<PostAccountOutput>;
  getAccount(accountNumber: number, headers: Headers): Promise<Account>;
  getAccounts(headers: Headers): Promise<AccountOutput[]>;
  putAccount(
    accountNumber: number,
    input: Customer,
    headers: Headers
  ): Promise<void>;
  deleteAccount(accountNumber: number, headers: Headers): Promise<void>;
  postCredit(
    accountNumber: number,
    input: Credit,
    headers: Headers
  ): Promise<void>;
  postDebit(
    accountNumber: number,
    input: Debit,
    headers: Headers
  ): Promise<void>;
  postTransfer(
    accountNumber: number,
    input: PostTransferInput,
    headers: Headers
  ): Promise<void>;
  getBalance(
    accountNumber: number,
    headers: Headers
  ): Promise<GetBalanceOutput>;
  getTransactions(
    accountNumber: number,
    headers: Headers
  ): Promise<GetTransactionsOutput>;
}
