export abstract class TokenUtil {
  static getAccountNumber(accessToken: string): number {
    const payload = accessToken.split(".")[1];
    const content = JSON.parse(atob(payload));
    return Number(content.unique_name);
  }
}
