import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
    } else if (path.includes('feed')) {
      requiredCoins = 1;
      serviceName = 'feed';
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

      // 요청을 처리하고 성공적으로 완료되면 코인 차감
      return next.handle().pipe(
        tap(async () => {
          // 코인 차감 요청
          await this.userService.post({
            path: `/user/${tamagotchi.user_id}/coin-transactions`,
            data: {
              changeAmount: -requiredCoins, // 필요한 코인 개수만큼 차감
              description: `Coin deduction for ${serviceName} service: ${requiredCoins} coins`,
            },
          });
        }),
        catchError((error) => {
          // 요청 처리 중 에러 발생 시 처리
          console.error('Error during request handling:', error.message);

          // error 객체에 response와 errorCode가 존재하는지 확인
          if (error.response && error.response.errorCode) {
            // errorCode가 존재할 경우에는 해당 에러를 그대로 던짐
            return throwError(() => error);
          } else if (
            error.message === 'Tamagotchi is not sick' ||
            error.message === 'hunger status already max'
          ) {
            // 특정 에러 메시지에 대해 AG-0007 반환
            throw new ApiError('AG-0007');
          } else {
            // 그 외의 경우 AG-0000 반환
            return throwError(() => new ApiError('AG-0000'));
          }
        }),
      );
    } catch (error) {
      // 초기 단계에서 발생한 에러 처리
      if (error instanceof ApiError) {
        return throwError(() => error);
      }

      console.error('Error in coin check:', error.message);
      return throwError(() => new ApiError('AG-0000'));
    }
  }
}
