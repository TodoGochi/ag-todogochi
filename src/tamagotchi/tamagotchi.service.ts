import { Injectable } from '@nestjs/common';
import { TamagotchiService as TamagotchiServer } from 'src/provider/server/services/tamagotchi.service';
import { ROLE } from 'src/common/constants/role.constant';
import { ApiError } from 'src/common/error/api.error';

@Injectable()
export class TamagotchiService {
  constructor(private readonly tamagotchiService: TamagotchiServer) {}

  async createNewTamagotchi(input: {
    userId: number;
    nickname: string;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: '/tamagotchi/create',
      data: {
        userId: input.userId,
        nickname: input.nickname,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Get Tamagotchi status (userId comes from body)
  async getTamagotchi(input: { userId: number; req: any }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.get({
      path: `/tamagotchi/${input.userId}/status`,
    });

    return { data: response.data, status: response.status };
  }

  async getLevelProgress(input: {
    TamagotchiId: number;
    userId: number;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.get({
      path: `/tamagotchi/${input.TamagotchiId}/level-progress`,
    });

    return { data: response.data, status: response.status };
  }

  // Feed Tamagotchi
  async feedTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}/feed`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Pet Tamagotchi
  async petTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}/pet`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Cure Tamagotchi
  async cureTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}/cure`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Resurrect Tamagotchi
  async resurrectTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}/resurrect`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Restart Tamagotchi
  async restartTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}/restart`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }

  // Play with Tamagotchi
  async playTamagotchi(input: {
    userId: number;
    req: any;
    TamagotchiId: number;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }

    const response = await this.tamagotchiService.post({
      path: `/tamagotchi/${input.TamagotchiId}play`,
      data: {
        userId: input.userId,
      },
    });

    return { data: response.data, status: response.status };
  }
}
