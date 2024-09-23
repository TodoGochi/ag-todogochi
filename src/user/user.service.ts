import { Injectable } from '@nestjs/common';
import { ROLE } from 'src/common/constants/role.constant';
import { ApiError } from 'src/common/error/api.error';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserServer) {}

  async getCoinTransactionsByUserId(input: { userId: number; req: any }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.userService.get({
      path: `/user/${input.userId}/coin-transactions`,
    });

    return { data: response.data, status: response.status };
  }

  async createCoinTransaction(input: {
    userId: number;
    changeAmount: number;
    description: string;
  }) {
    const response = await this.userService.post({
      path: `/user/${input.userId}/coin-transactions`,
      data: {
        changeAmount: input.changeAmount,
        description: input.description,
      },
    });

    return { data: response.data, status: response.status };
  }

  async getUserByToken(req: any) {
    const response = await this.userService.get({
      path: `/user/${req.user.userId}`,
    });

    return { data: response.data, status: response.status };
  }
}
