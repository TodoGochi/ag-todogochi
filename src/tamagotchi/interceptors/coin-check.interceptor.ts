import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { Request } from 'express';
import { ApiError } from 'src/common/error/api.error';
import { UserService as UserServer } from 'src/provider/server/services/user.service';
import { TamagotchiService as TamagotchiServer } from 'src/provider/server/services/tamagotchi.service';

@Injectable()
export class CoinCheckInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserServer,
    private readonly tamagotchiService: TamagotchiServer,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const tamagotchiId = request.params.id;
    const result = await this.tamagotchiService.get({
      path: `/tamagotchi/${tamagotchiId}/statusbytamagotchi`,
    });

    const tamagotchi = result.data;

    console.log(tamagotchi);

    // 요청 경로에서 어떤 서비스인지 확인
    const path = request.route.path;

    let requiredCoins: number;
    let serviceName: string;

    // 경로에 따라 서비스명과 필요한 코인 개수를 설정
    if (path.includes('cure')) {
      requiredCoins = 3;
      serviceName = 'cure';
    } else if (path.includes('resurrect')) {
      requiredCoins = 10;
      serviceName = 'resurrect';
    } else {
      requiredCoins = 0;
      serviceName = 'default';
    }

    try {
      // 외부 서버로 코인 정보 요청
      const response = await this.userService.get({
        path: `/user/${tamagotchi.user_id}`,
      });

      const coinBalance = response.data.coin;

      if (coinBalance == undefined) {
        throw new ApiError('AG-0004');
      }

      console.log('보유코인개수', coinBalance);
      console.log('필요코인개수', requiredCoins);

      // 필요한 코인 개수 이상인지 확인
      if (coinBalance < requiredCoins) {
        throw new ApiError('AG-0003');
      }

      // 코인 차감 요청
      await this.userService.post({
        path: `/user/${tamagotchi.user_id}/coin-transactions`,
        data: {
          changeAmount: -requiredCoins, // 필요한 코인 개수만큼 차감
          description: `Coin deduction for ${serviceName} service: ${requiredCoins} coins`,
        },
      });

      // 코인 차감 성공 후, 원래 요청 처리
      return next.handle();
    } catch (error) {
      // 에러 처리
      if (error instanceof ApiError) {
        // ApiError는 그대로 다시 던집니다
        return throwError(() => error);
      }

      //예상치 못한 에러 처리
      console.error('Error in coin check:', error.message);
      return throwError(() => new ApiError('AG-0000'));
    }
  }
}
