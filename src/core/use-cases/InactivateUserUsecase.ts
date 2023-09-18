import { IHttpGateway } from "../gateways/IHttpGateway";

export class InactivateUserUsecase {
  constructor(private readonly http: IHttpGateway) {}

  async execute(accountNumber: number): Promise<boolean> {
    try {
      await this.http.deleteUser(accountNumber);
      return true;
    } catch (error) {
      return false;
    }
  }
}
