import { Account } from "../../domain/Account";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class GetAccountCommand extends Command {
  async execute(): Promise<Account> {
    return await this.http!.getAccount(this.accountNumber, this.headers!);
  }
}

export class GetAccountUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<Account | null> {
    const command = new GetAccountCommand(accountNumber);
    return await this.executeCommand(accountNumber, command);
  }
}
