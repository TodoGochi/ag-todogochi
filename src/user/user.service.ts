import { Injectable } from '@nestjs/common';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserServer) {}

  async getCoinTransactionsByUserId(userId: number) {
    const response = await this.userService.get({
      path: `/user/${userId}/coin-transactions`,
    });

    return { data: response.data, status: response.status };
  }
}
