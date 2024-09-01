import { Injectable } from '@nestjs/common';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserServer) {}

  async signUp(input: { email: string; password: string; type: string }) {
    const response = await this.userService.post({
      path: '/user/sign-up',
      data: input,
    });
    return { data: response.data, status: response.status };
  }
}
