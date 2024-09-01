import { Debit } from "../../domain/Debit";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class DebitCommand extends Command {
  async execute(): Promise<boolean> {
    await this.http!.postDebit(this.accountNumber, this.input, this.headers!);
    return true;
  }
}

export class DebitUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Debit): Promise<boolean> {
    const command = new DebitCommand(accountNumber, input);
    return await this.executeCommand(accountNumber, command);
  }
}
