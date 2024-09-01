import { GetBalanceOutput } from "../../gateways/IHttpGateway";
import { BaseUsecase } from "../BaseUsecase";
import { Command } from "../Command";

class GetBalanceCommand extends Command {
  async execute(): Promise<GetBalanceOutput> {
    return await this.http!.getBalance(this.accountNumber, this.headers!);
  }
}

export class GetBalanceUsecase extends BaseUsecase {
  async execute(accountNumber: number): Promise<GetBalanceOutput | null> {
    const command = new GetBalanceCommand(accountNumber);
    return await this.executeCommand(accountNumber, command);
  }
}
