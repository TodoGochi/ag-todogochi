import { Injectable } from '@nestjs/common';
import { Config } from 'src/common/environment/config';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { objectToQuerystring } from 'src/utils/object-to-querystring';

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

  async signInKakao() {
    const response = await this.userService.get({
      path: '/auth/sign-in/kakao',
    });
    return { data: response.data, status: response.status };
  }

  async kakaoCallback(input: Record<string, any>) {
    const response = await this.userService.get({
      path: `/auth/kakao/callback?${objectToQuerystring(input)}`,
    });

    return { data: response.data, status: response.status };
  }
}
