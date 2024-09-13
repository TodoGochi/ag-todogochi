import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/common/decorators/roles.decorator';
import { ApiError } from 'src/common/error/api.error';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) {
      return true;
    }

    if (req.user.role >= role) {
      return true;
    }
    throw new ApiError('AG-0001');
  }
}
