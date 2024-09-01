import { GetTransactionsOutput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class GetTransactionsCommand extends Command {
  async execute(): Promise<GetTransactionsOutput> {
    return await this.http!.getTransactions(this.accountNumber, this.headers!);
  }
}

export class GetTransactionsUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<GetTransactionsOutput | null> {
    const command = new GetTransactionsCommand(accountNumber);
    return await this.executeCommand(accountNumber, command);
  }
}
