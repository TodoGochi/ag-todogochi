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
import { UserService } from './user.service';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import {
  CreateCoinTransactionReqBodyDto,
  UserIdReqParamDto,
} from './dto/user-req.dto';
import { Response, Request } from 'express';
import { USER_DOCS } from './constant/user.swagger';
import { Role } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/constants/role.constant';
import { AccessTokenGuard } from 'src/common/core/guards/access-token.guard';
import { RolesGuard } from 'src/common/core/guards/role.guard';

@Swagger(USER_DOCS.USER_CONTROLLER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger(USER_DOCS.GET_COIN_TRANSACTIONS_BY_USER_ID)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Get(':userId/coin-transactions')
  async getCoinTransactionByUserId(
    @Param() params: UserIdReqParamDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const response = await this.userService.getCoinTransactionsByUserId({
      userId: params.userId,
      req,
    });

    return res.status(response.status).json(response.data);
  }

  //TODO:: 나중에 보안생각해야함
  @Swagger(USER_DOCS.CREATE_COIN_TRANSACTION)
  @Post(':userId/coin-transactions')
  async createCoinTransaction(
    @Param() params: UserIdReqParamDto,
    @Body() body: CreateCoinTransactionReqBodyDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.createCoinTransaction({
      userId: params.userId,
      changeAmount: body.changeAmount,
      description: body.description,
    });

    return res.status(response.status).json(response.data);
  }

  @Swagger(USER_DOCS.GET_USER_BY_TOKEN)
  @UseGuards(AccessTokenGuard)
  @Get()
  async getUserByToken(@Req() req: Request, @Res() res: Response) {
    const response = await this.userService.getUserByToken(req);
    delete response.data.password;

    return res.status(response.status).json(response.data);
  }
}
