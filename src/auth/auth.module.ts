import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ServerModule } from 'src/provider/server/server.module';

@Module({
  imports: [ServerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
