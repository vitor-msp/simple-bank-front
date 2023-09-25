import { IHttpGateway, PostTransferInput } from "../../gateways/IHttpGateway";

export class TransferUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(
    accountNumber: number,
    input: PostTransferInput
  ): Promise<boolean> {
    try {
      await this.http.postTransfer(accountNumber, input);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
