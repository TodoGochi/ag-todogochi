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

@Injectable()
export class CoinCheckInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserServer, // 이 부분은 NestJS가 자동으로 주입
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.body.userId;

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
        path: `/user/${userId}`,
      });

      const coinBalance = response.data.coin;

      // 필요한 코인 개수 이상인지 확인
      if (coinBalance < requiredCoins) {
        throw new ApiError('AG-0003');
      }

      // 코인 차감 요청
      await this.userService.post({
        path: `/user/${userId}/coin-transactions`,
        data: {
          changeAmount: -requiredCoins, // 필요한 코인 개수만큼 차감
          description: `Coin deduction for ${serviceName} service: ${requiredCoins} coins`,
        },
      });

      // 코인 차감 성공 후, 원래 요청 처리
      return next.handle();
    } catch (error) {
      // 에러 처리
      console.error('Error in coin check:', error.message);
      return throwError(() => new ApiError('AG-0000'));
    }
  }
}
