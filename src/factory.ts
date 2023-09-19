import { CreateAccountUsecase } from "./core/use-cases/accounts/CreateAccountUsecase";
import { GetAccountUsecase } from "./core/use-cases/accounts/GetAccountUsecase";
import { InactivateAccountUsecase } from "./core/use-cases/accounts/InactivateAccountUsecase";
import { UpdateAccountUsecase } from "./core/use-cases/accounts/UpdateAccountUsecase";
import { CreditUsecase } from "./core/use-cases/transactions/CreditUsecase";
import { DebitUsecase } from "./core/use-cases/transactions/DebitUsecase";
import { GetBalanceUsecase } from "./core/use-cases/transactions/GetBalanceUsecase";
import { TransferUsecase } from "./core/use-cases/transactions/TransferUsecase";
import { HttpAdapter } from "./mocks/HttpAdapter";

const httpAdapter = new HttpAdapter();

export const createAccountUsecase = new CreateAccountUsecase(httpAdapter);
export const getAccountUsecase = new GetAccountUsecase(httpAdapter);
export const updateAccountUsecase = new UpdateAccountUsecase(httpAdapter);
export const inactivateAccountUsecase = new InactivateAccountUsecase(
  httpAdapter
);

export const creditUsecase = new CreditUsecase(httpAdapter);
export const debitUsecase = new DebitUsecase(httpAdapter);
export const transferUsecase = new TransferUsecase(httpAdapter);
export const getBalanceUsecase = new GetBalanceUsecase(httpAdapter);
