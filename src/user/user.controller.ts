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
import { UserIdReqParamDto } from './dto/user-req.dto';
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
}
