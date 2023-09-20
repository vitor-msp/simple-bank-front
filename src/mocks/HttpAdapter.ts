import { Account } from "../core/domain/Account";
import { Credit } from "../core/domain/Credit";
import { Customer } from "../core/domain/Customer";
import { Debit } from "../core/domain/Debit";
import {
  AccountOutput,
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
    alert(JSON.stringify("back accountNumber " + accountNumber));
    return {
      accountNumber: new Date().getTime(),
      createdAt: new Date(),
      owner: { cpf: "0000", name: "fulano" },
    };
  }

  getAccounts(): AccountOutput[] {
    return [
      { accountNumber: 111, name: "fulano de tal" },
      { accountNumber: 222, name: "ciclano de tal" },
      { accountNumber: 333, name: "beltrano da silva" },
    ];
  }

  putAccount(accountNumber: number, input: Customer): void {}

  deleteAccount(accountNumber: number): void {}

  postCredit(accountNumber: number, input: Credit): void {}

  postDebit(accountNumber: number, input: Debit): void {}

  postTransfer(accountNumber: number, input: PostTransferInput): void {
    console.log(accountNumber);
    console.log(JSON.stringify(input));
  }

  getBalance(accountNumber: number): GetBalanceOutput {
    return { balance: 15 };
  }

  getTransactions(accountNumber: number): GetTransactionsOutput {
    const a: GetTransactionsOutput = {
      transactions: [
        {
          type: "credit",
          value: 150,
          createdAt: new Date(),
        },
        {
          type: "debit",
          value: -16.65,
          createdAt: new Date(),
        },
        {
          type: "transfer",
          value: 16.6,
          createdAt: new Date(),
          sender: {
            accountNumber: 1500,
            name: "sender name",
          },
          recipient: {
            accountNumber: 1169,
            name: "recipient name",
          },
        },
      ],
    };
    return a;
  }
}
