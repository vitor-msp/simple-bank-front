import { CreateAccountUsecase } from "./core/use-cases/accounts/CreateAccountUsecase";
import { GetAccountUsecase } from "./core/use-cases/accounts/GetAccountUsecase";
import { InactivateAccountUsecase } from "./core/use-cases/accounts/InactivateAccountUsecase";
import { UpdateAccountUsecase } from "./core/use-cases/accounts/UpdateAccountUsecase";
import { HttpAdapter } from "./mocks/HttpAdapter";

const httpAdapter = new HttpAdapter();
export const createAccountUsecase = new CreateAccountUsecase(httpAdapter);
export const getAccountUsecase = new GetAccountUsecase(httpAdapter);
export const updateAccountUsecase = new UpdateAccountUsecase(httpAdapter);
export const inactivateAccountUsecase = new InactivateAccountUsecase(
  httpAdapter
);
