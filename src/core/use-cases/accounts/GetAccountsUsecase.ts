import { AccountOutput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class GetAccountsCommand extends Command {
  async execute(): Promise<AccountOutput[]> {
    return await this.http!.getAccounts(this.headers!);
  }
}

export class GetAccountsUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<AccountOutput[]> {
    const command = new GetAccountsCommand(accountNumber);
    return await this.executeCommand(accountNumber, command);
  }
}
