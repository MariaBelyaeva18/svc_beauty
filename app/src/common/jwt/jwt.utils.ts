import { createHmac, timingSafeEqual } from 'crypto';
import { JwtPayload, JwtSignOptions } from './jwt.types';

const base64UrlEncode = (input: Buffer | string) => {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const base64UrlDecodeToBuffer = (input: string) => {
  const padLength = (4 - (input.length % 4)) % 4;
  const padded = `${input}${'='.repeat(padLength)}`.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64');
};

const jsonParse = <T>(buf: Buffer): T => JSON.parse(buf.toString('utf8')) as T;

const hmacSha256 = (data: string, secret: string) =>
  createHmac('sha256', secret).update(data).digest();

export const jwtSignHs256 = (payload: JwtPayload, secret: string, options?: JwtSignOptions) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const nowSeconds = Math.floor(Date.now() / 1000);

  const expiresInSeconds = options?.expiresInSeconds;
  const fullPayload: JwtPayload = {
    ...payload,
    iat: nowSeconds,
    ...(typeof expiresInSeconds === 'number' ? { exp: nowSeconds + expiresInSeconds } : {}),
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = base64UrlEncode(hmacSha256(signingInput, secret));

  return `${signingInput}.${signature}`;
};

export const JWT_ERROR_INVALID = 'JWT_INVALID';
export const JWT_ERROR_EXPIRED = 'JWT_EXPIRED';

const jwtError = (name: string, message: string) => {
  const err = new Error(message);
  err.name = name;
  return err;
};

export const jwtVerifyHs256 = (token: string, secret: string): JwtPayload => {
  const parts = token.split('.');
  if (parts.length !== 3) throw jwtError(JWT_ERROR_INVALID, 'Invalid token format');

  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = base64UrlEncode(hmacSha256(signingInput, secret));

  const expected = Buffer.from(expectedSignature, 'utf8');
  const actual = Buffer.from(encodedSignature, 'utf8');
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    throw jwtError(JWT_ERROR_INVALID, 'Invalid token signature');
  }

  const payload = jsonParse<JwtPayload>(base64UrlDecodeToBuffer(encodedPayload));
  const nowSeconds = Math.floor(Date.now() / 1000);
  const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
  if (typeof exp === 'number' && nowSeconds >= exp) {
    throw jwtError(JWT_ERROR_EXPIRED, 'Token expired');
  }

  return payload;
};
