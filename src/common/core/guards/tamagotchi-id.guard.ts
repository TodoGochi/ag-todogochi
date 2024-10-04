import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TamagotchiService } from 'src/provider/server/services/tamagotchi.service';
import { ApiError } from 'src/common/error/api.error';
@Injectable()
export class TamagotchiOwnershipGuard implements CanActivate {
  constructor(private readonly tamagotchiService: TamagotchiService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId; // Access token에서 추출된 사용자 ID
    console.log('request', userId);

    const tamagotchiId = parseInt(request.params.id); // 요청 파라미터로 전달된 다마고치 ID

    console.log('param_id', tamagotchiId);

    const tamagotchi = await this.tamagotchiService.get({
      path: `/tamagotchi/${userId}/status`,
    });

    if (!tamagotchi) {
      throw new ApiError('AG-0006');
    } else if (tamagotchi.data.id !== tamagotchiId) {
      console.log(typeof tamagotchi.data.id);
      console.log(typeof tamagotchiId);
      throw new ApiError('AG-0005');
    }

    return true;
  }
}
