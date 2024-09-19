import { Injectable } from '@nestjs/common';
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

  async signInKakao(input: Record<string, any>) {
    const response = await this.userService.post({
      path: `/auth/sign-in/kakao?${objectToQuerystring(input)}`,
    });

    return { data: response.data, status: response.status };
  }

  async refreshAccessToken(input: { oldRefreshToken: string }) {
    const response = await this.userService.post({
      path: '/auth/refresh',
      data: input,
    });

    return { data: response.data, status: response.status };
  }
}
