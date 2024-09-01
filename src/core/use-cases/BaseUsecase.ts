import { Headers } from "../domain/Headers";
import { IHttpGateway } from "../gateways/IHttpGateway";

export abstract class BaseUsecase {
  constructor(protected readonly http: IHttpGateway) {}

  getAuthorizationHeader(): Headers {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("Session expired.");

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}
