export type LoginInput = {
  accountNumber?: number;
  password?: string;
};

export type LoginOutput = {
  accessToken?: string;
  refreshToken?: string;
};