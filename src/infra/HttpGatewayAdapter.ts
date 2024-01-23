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

  async getAccount(accountNumber: number): Promise<Account> {
    const account = await this.api
      .get<Account>(`/accounts/${accountNumber}`)
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

  async putAccount(accountNumber: number, input: Customer): Promise<void> {
    await this.api
      .put(`/accounts/${accountNumber}`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async deleteAccount(accountNumber: number): Promise<void> {
    await this.api
      .delete(`/accounts/${accountNumber}`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postCredit(accountNumber: number, input: Credit): Promise<void> {
    await this.api
      .post(`/transactions/credit/${accountNumber}`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postDebit(accountNumber: number, input: Debit): Promise<void> {
    await this.api
      .post(`/transactions/debit/${accountNumber}`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async postTransfer(
    accountNumber: number,
    input: PostTransferInput
  ): Promise<void> {
    await this.api
      .post(`/transactions/transfer/${accountNumber}`, input)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
  }

  async getBalance(accountNumber: number): Promise<GetBalanceOutput> {
    const response = await this.api
      .get<GetBalanceOutput>(`/transactions/balance/${accountNumber}`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return response;
  }

  async getTransactions(accountNumber: number): Promise<GetTransactionsOutput> {
    const response = await this.api
      .get<GetTransactionsOutputApi>(`/transactions/${accountNumber}`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(
          error?.response?.data?.apiErrorMessage ?? "Unknown error."
        );
      });
    return {
      transactions: response.statement.transactions.map(
        (t): TransactionOutput => {
          if (t.type === "credit" && t.creditDto)
            return {
              type: t.type,
              createdAt: new Date(t.creditDto.createdAt),
              value: t.creditDto.value,
            };

          if (t.type === "debit" && t.debitDto)
            return {
              type: t.type,
              createdAt: new Date(t.debitDto.createdAt),
              value: t.debitDto.value,
            };

          if (t.type === "transfer" && t.transferDto)
            return {
              type: t.type,
              createdAt: new Date(t.transferDto.createdAt),
              value: t.transferDto.value,
              sender: t.transferDto.sender,
              recipient: t.transferDto.recipient,
            };

          throw new Error();
        }
      ),
    };
  }
}
