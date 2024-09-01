import { AxiosInstance } from "axios";
import { Account } from "../core/domain/Account";
import { Credit } from "../core/domain/Credit";
import { Customer } from "../core/domain/Customer";
import { Debit } from "../core/domain/Debit";
import {
  AccountOutput,
  GetAccountsOutput,
  GetBalanceOutput,
  GetTransactionsOutput,
  GetTransactionsOutputApi,
  IHttpGateway,
  PostAccountOutput,
  PostTransferInput,
  TransactionOutput,
} from "../core/gateways/IHttpGateway";
import { LoginInput, LoginOutput } from "../core/domain/Login";
import { Headers } from "../core/domain/Headers";

export class HttpGatewayAdapter implements IHttpGateway {
  constructor(private readonly api: AxiosInstance) {}

  async postAccount(input: Customer): Promise<PostAccountOutput> {
    const account = await this.api
      .post<PostAccountOutput>(`/accounts`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return account;
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    const output = await this.api
      .post<LoginOutput>(`/login`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return output;
  }

  async getAccount(accountNumber: number, headers: Headers): Promise<Account> {
    const account = await this.api
      .get<Account>(`/accounts/${accountNumber}`, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return account;
  }

  async getAccounts(): Promise<AccountOutput[]> {
    const response = await this.api
      .get<GetAccountsOutput>(`/accounts`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return response.accounts;
  }

  async putAccount(
    accountNumber: number,
    input: Customer,
    headers: Headers
  ): Promise<void> {
    await this.api
      .put(`/accounts/${accountNumber}`, input, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async deleteAccount(accountNumber: number, headers: Headers): Promise<void> {
    await this.api
      .delete(`/accounts/${accountNumber}`, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postCredit(
    accountNumber: number,
    input: Credit,
    headers: Headers
  ): Promise<void> {
    await this.api
      .post(`/transactions/credit/${accountNumber}`, input, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postDebit(
    accountNumber: number,
    input: Debit,
    headers: Headers
  ): Promise<void> {
    await this.api
      .post(`/transactions/debit/${accountNumber}`, input, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postTransfer(
    accountNumber: number,
    input: PostTransferInput,
    headers: Headers
  ): Promise<void> {
    await this.api
      .post(`/transactions/transfer/${accountNumber}`, input, { headers })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async getBalance(
    accountNumber: number,
    headers: Headers
  ): Promise<GetBalanceOutput> {
    const response = await this.api
      .get<GetBalanceOutput>(`/transactions/balance/${accountNumber}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return response;
  }

  async getTransactions(
    accountNumber: number,
    headers: Headers
  ): Promise<GetTransactionsOutput> {
    const response = await this.api
      .get<GetTransactionsOutputApi>(`/transactions/${accountNumber}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return {
      transactions: response.statement.transactions.map(
        (t): TransactionOutput => {
          if (t.type === "Credit" && t.creditDto)
            return {
              type: t.type,
              createdAt: new Date(t.creditDto.createdAt),
              value: t.creditDto.value,
            };

          if (t.type === "Debit" && t.debitDto)
            return {
              type: t.type,
              createdAt: new Date(t.debitDto.createdAt),
              value: t.debitDto.value,
            };

          if (t.type === "Transfer" && t.transferDto)
            return {
              type: t.type,
              createdAt: new Date(t.transferDto.createdAt),
              value: t.transferDto.value,
              sender: t.transferDto.sender,
              recipient: t.transferDto.recipient,
            };

          throw new Error("Error to get transactions.");
        }
      ),
    };
  }
}
