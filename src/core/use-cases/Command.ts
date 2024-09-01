import { Headers } from "../domain/Headers";
import { IHttpGateway } from "../gateways/IHttpGateway";

export abstract class Command {
  protected http?: IHttpGateway;
  protected headers?: Headers;

  constructor(
    protected readonly accountNumber: number,
    protected readonly input?: any
  ) {}

  setHttp(http: IHttpGateway): void {
    this.http = http;
  }

  setHeaders(headers: Headers): void {
    this.headers = headers;
  }

  abstract execute(): Promise<any>;
}
