import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

@Module({
  imports: [HttpModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServerModule {}
