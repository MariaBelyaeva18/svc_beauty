import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async checkUser(param: {
    username: string;
    password: string;
  }): Promise<{ username: string; password: string }> {
    return param;
  }
}
