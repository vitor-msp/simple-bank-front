import { PostTransferInput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";

export class TransferUsecase extends BaseUsecase {
  async execute(
    accountNumber: number,
    input: PostTransferInput
  ): Promise<boolean> {
    try {
      const headers = this.getAuthorizationHeader();
      await this.http.postTransfer(accountNumber, input, headers);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
}
