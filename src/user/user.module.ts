import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ServerModule } from 'src/provider/server/server.module';

@Module({
  imports: [ServerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
