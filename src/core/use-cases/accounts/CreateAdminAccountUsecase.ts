import { Account } from "../../domain/Account";
import { Customer } from "../../domain/Customer";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class PostAdminAccountCommand extends Command {
  async execute(): Promise<Account> {
    return await this.http!.postAdminAccount(this.input, this.headers!);
  }
}

export class CreateAdminAccountUsecase extends BaseUsecase {
  async execute(
    accountNumber: number,
    input: Customer
  ): Promise<Account | null> {
    const command = new PostAdminAccountCommand(accountNumber, input);
    return await this.executeCommand(accountNumber, command);
  }
}
