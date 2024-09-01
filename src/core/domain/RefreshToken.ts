export type RefreshTokenInput = {
  accountNumber?: number;
  refreshToken?: string;
};

export type RefreshTokenOutput = {
  accessToken?: string;
};
