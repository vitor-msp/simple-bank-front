import {
  GetTransactionsOutput,
  IHttpGateway,
} from "../../gateways/IHttpGateway";

export class GetTransactionsUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<GetTransactionsOutput | null> {
    try {
      return await this.http.getTransactions(accountNumber);
    } catch (error) {
      return null;
    }
  }
}
