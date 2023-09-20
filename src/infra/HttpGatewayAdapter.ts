import { AxiosInstance } from "axios";
import { Account } from "../core/domain/Account";
import { Credit } from "../core/domain/Credit";
import { Customer } from "../core/domain/Customer";
import { Debit } from "../core/domain/Debit";
import {
  AccountOutput,
  GetBalanceOutput,
  GetTransactionsOutput,
  IHttpGateway,
  PostAccountOutput,
  PostTransferInput,
} from "../core/gateways/IHttpGateway";

export class HttpGatewayAdapter implements IHttpGateway {
  constructor(private readonly api: AxiosInstance) {}

  async postAccount(input: Customer): Promise<PostAccountOutput> {
    const account = await this.api
      .post<PostAccountOutput>(`/accounts`, input)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        throw new Error("error to post account");
      });
    return account;
  }

  async getAccount(accountNumber: number): Promise<Account> {
    const account = await this.api
      .get<Account>(`/accounts/${accountNumber}`)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get account");
      });
    console.log(account);
    return account;
  }

  async getAccounts(): Promise<AccountOutput[]> {
    return [
      { accountNumber: 111, name: "fulano de tal" },
      { accountNumber: 222, name: "ciclano de tal" },
      { accountNumber: 333, name: "beltrano da silva" },
    ];
  }

  async putAccount(accountNumber: number, input: Customer): Promise<void> {
    await this.api
      .put(`/accounts/${accountNumber}`, input)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        throw new Error("error to put account");
      });
  }

  async deleteAccount(accountNumber: number): Promise<void> {}

  async postCredit(accountNumber: number, input: Credit): Promise<void> {}

  async postDebit(accountNumber: number, input: Debit): Promise<void> {}

  async postTransfer(
    accountNumber: number,
    input: PostTransferInput
  ): Promise<void> {
    console.log(accountNumber);
    console.log(JSON.stringify(input));
  }

  async getBalance(accountNumber: number): Promise<GetBalanceOutput> {
    return { balance: 15 };
  }

  async getTransactions(accountNumber: number): Promise<GetTransactionsOutput> {
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
