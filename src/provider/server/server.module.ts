import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import axios from 'axios';
import { Config } from 'src/common/environment/config';
import { TodoListService } from './services/todolist.service';

@Module({
  imports: [HttpModule],
  providers: [
    UserService,
    {
      provide: 'USER_SERVER',
      useFactory: () => {
        return axios.create({
          baseURL: Config.getEnvironment().USER_SERVER_ADDR,
        });
      },
    },
    TodoListService,
    {
      provide: 'TODOLIST_SERVER',
      useFactory: () => {
        return axios.create({
          baseURL: Config.getEnvironment().TODOLIST_SERVER_ADDR,
        });
      },
    },
  ],
  exports: [UserService, TodoListService],
})
export class ServerModule {}
