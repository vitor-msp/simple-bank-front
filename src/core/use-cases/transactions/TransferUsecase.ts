import { PostTransferInput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class TransferCommand extends Command {
  async execute(): Promise<boolean> {
    await this.http!.postTransfer(
      this.accountNumber,
      this.input,
      this.headers!
    );
    return true;
  }
}

export class TransferUsecase extends BaseUsecase {
  async execute(
    accountNumber: number,
    input: PostTransferInput
  ): Promise<boolean> {
    const command = new TransferCommand(accountNumber, input);
    return await this.executeCommand(accountNumber, command);
  }
}
