import { Account } from "./Account";

export type Transfer = {
  value?: number;
  createdAt?: Date;
  sender?: Account;
  recipient?: Account;
};
