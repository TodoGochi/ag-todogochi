import { Injectable } from '@nestjs/common';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserServer) {}

  async signUp(input: { email: string; password: string }) {
    const response = await this.userService.post({
      path: '/auth/sign-up',
      data: input,
    });
    return { data: response.data, status: response.status };
  }

  async emailCheck(input: { email: string }) {
    const response = await this.userService.post({
      path: '/auth/email-check',
      data: input,
    });
    return { data: response.data, status: response.status };
  }

  async signIn(input: { email: string; password: string }) {
    const response = await this.userService.post({
      path: '/auth/sign-in',
      data: input,
    });
    return { data: response.data, status: response.status };
  }
}
