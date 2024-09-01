import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class InactivateAccountCommand extends Command {
  async execute(): Promise<boolean> {
    await this.http!.deleteAccount(this.accountNumber, this.headers!);
    return true;
  }
}

export class InactivateAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<boolean> {
    const command = new InactivateAccountCommand(accountNumber);
    return await this.executeCommand(accountNumber, command);
  }
}
