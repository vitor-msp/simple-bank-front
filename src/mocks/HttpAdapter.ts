import { Account } from "../core/domain/Account";
import { Credit } from "../core/domain/Credit";
import { Customer } from "../core/domain/Customer";
import { Debit } from "../core/domain/Debit";
import {
  GetBalanceOutput,
  GetTransactionsOutput,
  IHttpGateway,
  PostTransferInput,
} from "../core/gateways/IHttpGateway";

export class HttpAdapter implements IHttpGateway {
  postAccount(input: Customer): Account {
    alert(JSON.stringify(input));
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

  postCredit(accountNumber: number, input: Credit): void {}

  postDebit(accountNumber: number, input: Debit): void {}

  postTransfer(accountNumber: number, input: PostTransferInput): void {}

  getBalance(accountNumber: number): GetBalanceOutput {
    return { balance: 15 };
  }

  getTransactions(accountNumber: number): GetTransactionsOutput {
    return { transactions: [] };
  }
}
