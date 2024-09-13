import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiError } from 'src/common/error/api.error';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access-token') {
  constructor(private readonly userService: UserServer) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isExistUser = await this.userService.get({
      path: `/user/${user.userId}`,
    });
    if (!isExistUser) {
      throw new ApiError('AG-0002', 'User does not exist');
    }
    return true;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || info || !user) {
      throw new ApiError('AG-0002', `Invalid access token :: ${info?.message}`);
    }

    return user;
  }
}
