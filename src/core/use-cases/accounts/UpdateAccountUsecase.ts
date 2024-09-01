import { Customer } from "../../domain/Customer";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class UpdateAccountCommand extends Command {
  async execute(): Promise<boolean> {
    await this.http!.putAccount(this.accountNumber, this.input, this.headers!);
    return true;
  }
}

export class UpdateAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number, input: Customer): Promise<boolean> {
    const command = new UpdateAccountCommand(accountNumber, input);
    return await this.executeCommand(accountNumber, command);
  }
}
