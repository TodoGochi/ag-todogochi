import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import {
  CompleteTodoListReqParamDto,
  CreateSpecificDayTodoListReqBodyDto,
  CreateWeeklyTodoListReqBodyDto,
  GetTodoListsByDayReqParamDto,
  GetTodoListsByPeriodReqParamDto,
} from './dto/todolist-req.dto';
import { AccessTokenGuard } from 'src/common/core/guards/access-token.guard';
import { RolesGuard } from 'src/common/core/guards/role.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/constants/role.constant';
import { Request, Response } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import { TODOLIST_DOCS } from './constant/todolist.swagger';

@Swagger(TODOLIST_DOCS.TODOLIST_CONTROLLER)
@Controller('todolist')
export class TodolistController {
  constructor(private readonly todoListService: TodolistService) {}

  @Swagger(TODOLIST_DOCS.CREATE_SPECIFIC_DAY_TODOLIST)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Post('specific-day')
  async createSpecificDayTodoList(
    @Body() body: CreateSpecificDayTodoListReqBodyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.todoListService.createSpecificDayTodoList({
      ...body,
      req,
    });

    return res.status(response.status).json(response.data);
  }

  @Swagger(TODOLIST_DOCS.GET_TODOLISTS_BY_DAY)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Get(':userId/:targetDate')
  async getTodoListsByDay(
    @Param() params: GetTodoListsByDayReqParamDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const response = await this.todoListService.getTodoListsByDay({
      userId: params.userId,
      targetDate: params.targetDate,
      req,
    });

    return res.status(response.status).json(response.data);
  }

  @Swagger(TODOLIST_DOCS.CREATE_WEEKLY_TODOLIST)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Post('weekly')
  async createWeeklyTodoList(
    @Body() body: CreateWeeklyTodoListReqBodyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.todoListService.createWeeklyTodoList({
      ...body,
      req,
    });

    return res.status(response.status).json(response.data);
  }

  @Swagger(TODOLIST_DOCS.COMPLETE_TODOLIST)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Post('complete/:userId/:todoId')
  async completeTodoList(
    @Param() params: CompleteTodoListReqParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.todoListService.completeTodoList({
      userId: params.userId,
      todoId: params.todoId,
      req,
    });

    return res.status(response.status).json(response.data);
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Get('period/:userId/:startDate/:endDate')
  async getTodoListsByPeriod(
    @Param() params: GetTodoListsByPeriodReqParamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.todoListService.getTodoListsByPeriod({
      userId: params.userId,
      startDate: params.startDate,
      endDate: params.endDate,
      req,
    });

    return res.status(response.status).json(response.data);
  }
}
