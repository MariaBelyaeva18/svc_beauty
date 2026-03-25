import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayload } from './jwt.types';
import { jwtSignHs256, jwtVerifyHs256 } from './jwt.utils';

@Injectable()
export class JwtTokenService {
  private getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new InternalServerErrorException('JWT_SECRET is not configured');
    }
    return secret;
  }

  private getExpiresInSeconds(): number | undefined {
    const value = process.env.JWT_EXPIRES_IN_SECONDS;
    if (!value) return undefined;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
    return Math.floor(parsed);
  }

  sign(payload: JwtPayload): string {
    return jwtSignHs256(payload, this.getSecret(), {
      expiresInSeconds: this.getExpiresInSeconds(),
    });
  }

  verify(token: string): JwtPayload {
    return jwtVerifyHs256(token, this.getSecret());
  }
}
