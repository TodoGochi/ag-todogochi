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
    targetTime?: string;
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

  async getTodoListsByDay(input: {
    userId: number;
    targetDate: number;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.get({
      path: `/todolist/${input.userId}/${input.targetDate}`,
    });

    return { data: response.data, status: response.status };
  }

  async createWeeklyTodoList(input: {
    userId: number;
    todoText: string;
    colorTag: ColorTagType;
    days: string[];
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
      path: '/todolist/weekly',
      data: {
        userId: input.userId,
        todoText: input.todoText,
        colorTag: input.colorTag,
        days: input.days,
        targetTime: input.targetTime,
      },
    });

    return { data: response.data, status: response.status };
  }

  async completeTodoList(input: { userId: number; todoId: number; req: any }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.post({
      path: `/todolist/complete/${input.todoId}`,
    });

    return { data: response.data, status: response.status };
  }

  async getTodoListsByPeriod(input: {
    userId: number;
    startDate: number;
    endDate: number;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.get({
      path: `/todolist/period/${input.userId}/${input.startDate}/${input.endDate}`,
    });

    return { data: response.data, status: response.status };
  }

  async updateTodoList(input: {
    userId: number;
    todoId: number;
    todoText?: string;
    colorTag?: ColorTagType;
    targetTime?: string;
    targetDate?: number;
    req: any;
  }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.put({
      path: `/todolist/update/${input.todoId}`,
      data: {
        userId: input.userId,
        todoText: input.todoText,
        colorTag: input.colorTag,
        targetTime: input.targetTime,
        targetDate: input.targetDate,
      },
    });

    return { data: response.data, status: response.status };
  }

  async deleteTodoList(input: { userId: number; todoId: number; req: any }) {
    if (
      input.req.user.role < ROLE.ADMIN &&
      input.req.user.userId !== input.userId
    ) {
      throw new ApiError('AG-0001');
    }
    const response = await this.todoListService.delete({
      path: `/todolist/delete/${input.todoId}?userId=${input.userId}`,
    });

    return { data: response.data, status: response.status };
  }
}
