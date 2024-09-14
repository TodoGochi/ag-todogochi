import { Injectable } from '@nestjs/common';
import { TodoListService as TodoListServer } from 'src/provider/server/services/todolist.service';
import { ColorTagType } from './constant/color-tag.type';
import { ROLE } from 'src/common/constants/role.constant';
import { ApiError } from 'src/common/error/api.error';

@Injectable()
export class TodolistService {
  constructor(private readonly todoListService: TodoListServer) {}

  async createSpecificDayTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    targetDate: number;
    targetTime: string;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.post({
      path: '/todolist/specific-day',
      data: {
        userId: input.userId,
        todoText: input.todoText,
        colorTag: input.colorTag,
        targetDate: input.targetDate,
        targetTime: input.targetTime,
      },
    });

    return { data: response.data, status: response.status };
  }
}
