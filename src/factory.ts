import { CreateUserUsecase } from "./core/use-cases/CreateUserUsecase";
import { GetUserUsecase } from "./core/use-cases/GetUserUsecase";
import { HttpAdapter } from "./mocks/HttpAdapter";

const httpAdapter = new HttpAdapter();
export const createUserUsecase = new CreateUserUsecase(httpAdapter);
export const getUserUsecase = new GetUserUsecase(httpAdapter);
