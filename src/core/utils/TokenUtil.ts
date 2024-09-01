import { Role } from "../domain/Role";

export abstract class TokenUtil {
  private static getTokenContent(accessToken: string): any {
    const payload = accessToken.split(".")[1];
    return JSON.parse(atob(payload));
  }

  static getAccountNumber(accessToken: string): number {
    const content = this.getTokenContent(accessToken);
    return Number(content.unique_name);
  }

  static getRole(accessToken: string): Role {
    const content = this.getTokenContent(accessToken);
    return content.role as Role;
  }
}
