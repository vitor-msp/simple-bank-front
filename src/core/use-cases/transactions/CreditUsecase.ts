import { Credit } from "../../domain/Credit";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class CreditCommand extends Command {
  async execute(): Promise<boolean> {
    await this.http!.postCredit(this.accountNumber, this.input, this.headers!);
    return true;
  }
}

export class CreditUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Credit): Promise<boolean> {
    const command = new CreditCommand(accountNumber, input);
    return await this.executeCommand(accountNumber, command);
  }
}
