import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import { UserIdReqParamDto } from './dto/user-req.dto';
import { Response, Request } from 'express';
import { USER_DOCS } from './constant/user.swagger';

@Swagger(USER_DOCS.USER_CONTROLLER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger(USER_DOCS.GET_COIN_TRANSACTIONS_BY_USER_ID)
  @Get(':userId/coin-transactions')
  async getCoinTransactionByUserId(
    @Param() params: UserIdReqParamDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.getCoinTransactionsByUserId(
      params.userId,
    );

    return res.status(response.status).json(response.data);
  }
}
