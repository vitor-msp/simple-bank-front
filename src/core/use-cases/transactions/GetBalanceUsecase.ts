import { GetBalanceOutput, IHttpGateway } from "../../gateways/IHttpGateway";

export class GetBalanceUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<GetBalanceOutput | null> {
    try {
      return await this.http.getBalance(accountNumber);
    } catch (error) {
      alert(error);
      return null;
    }
  }
}
