import { Customer } from "./Customer";

export type Account = {
  accountNumber?: number;
  owner?: Customer;
  createdAt?: Date;
};
