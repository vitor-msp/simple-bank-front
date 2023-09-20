import axios from "axios";
import { CreateAccountUsecase } from "./core/use-cases/accounts/CreateAccountUsecase";
import { GetAccountUsecase } from "./core/use-cases/accounts/GetAccountUsecase";
import { GetAccountsUsecase } from "./core/use-cases/accounts/GetAccountsUsecase";
import { InactivateAccountUsecase } from "./core/use-cases/accounts/InactivateAccountUsecase";
import { UpdateAccountUsecase } from "./core/use-cases/accounts/UpdateAccountUsecase";
import { CreditUsecase } from "./core/use-cases/transactions/CreditUsecase";
import { DebitUsecase } from "./core/use-cases/transactions/DebitUsecase";
import { GetBalanceUsecase } from "./core/use-cases/transactions/GetBalanceUsecase";
import { GetTransactionsUsecase } from "./core/use-cases/transactions/GetTransactionsUsecase";
import { TransferUsecase } from "./core/use-cases/transactions/TransferUsecase";
import { HttpGatewayAdapter } from "./infra/HttpGatewayAdapter";

const API_URL = process.env.REACT_APP_API_URL;
if (!API_URL || API_URL.localeCompare("") === 0)
  throw Error("missing API_URL environment variable");
const httpAdapter = new HttpGatewayAdapter(axios.create({ baseURL: API_URL }));

export const createAccountUsecase = new CreateAccountUsecase(httpAdapter);
export const getAccountUsecase = new GetAccountUsecase(httpAdapter);
export const getAccountsUsecase = new GetAccountsUsecase(httpAdapter);
export const updateAccountUsecase = new UpdateAccountUsecase(httpAdapter);
export const inactivateAccountUsecase = new InactivateAccountUsecase(
  httpAdapter
);

export const creditUsecase = new CreditUsecase(httpAdapter);
export const debitUsecase = new DebitUsecase(httpAdapter);
export const transferUsecase = new TransferUsecase(httpAdapter);
export const getBalanceUsecase = new GetBalanceUsecase(httpAdapter);
export const getTransactionsUsecase = new GetTransactionsUsecase(httpAdapter);
