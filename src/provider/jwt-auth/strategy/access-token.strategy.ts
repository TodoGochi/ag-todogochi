import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from 'src/common/environment/config';

type AccessTokenPayload = {
  sub: number;
  role: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.getEnvironment().JWT.accessSecret,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return {
      userId: payload.sub,
      role: payload.role,
    };
  }
}
