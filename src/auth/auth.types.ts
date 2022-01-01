export type User = {
  id: string;
  email: string;
  token: string;
};

export type LoginPayload = {
  email: string;
  token: string;
};

export type AccessToken = {
  accessToken: string;
};

export type JwtPayload = {
  id: string;
};
