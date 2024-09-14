import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateSpecificDayTodoListReqBodyDto } from './dto/todolist-req.dto';
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
}
