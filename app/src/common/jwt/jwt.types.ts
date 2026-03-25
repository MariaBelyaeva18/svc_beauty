export type JwtPrimitive = string | number | boolean | null;

export interface JwtPayload {
  [key: string]: JwtPrimitive | JwtPrimitive[] | JwtPayload;
}

export type JwtSignOptions = {
  expiresInSeconds?: number;
};
