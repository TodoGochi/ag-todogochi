import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AccessTokenStrategy],
})
export class JwtAuthModule {}
