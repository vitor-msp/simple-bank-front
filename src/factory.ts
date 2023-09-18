import { CreateUserUsecase } from "./core/use-cases/CreateUserUsecase";
import { HttpAdapter } from "./mocks/HttpAdapter";

const httpAdapter = new HttpAdapter();
export const createUserUsecase = new CreateUserUsecase(httpAdapter);
