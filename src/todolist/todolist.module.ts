import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { ServerModule } from 'src/provider/server/server.module';

@Module({
  imports: [ServerModule],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
