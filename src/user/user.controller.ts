import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import {
  EmailCheckReqBodyDto,
  SignInReqBodyDto,
  SignUpReqBodyDto,
} from './dto/user-req.dto';
import { Response } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import { USER_DOCS } from './constant/user.swagger';
import { REFRESH_TOKEN_MAX_AGE } from './constant/refresh-token-max-age.constant';

@Swagger(USER_DOCS.USER_CONTROLLER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger(USER_DOCS.SIGN_UP)
  @Post('sign-up')
  async signUp(@Body() body: SignUpReqBodyDto, @Res() res: Response) {
    const response = await this.userService.signUp(body);
    const { user, tokens } = response.data;
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }

  @Swagger(USER_DOCS.EMAIL_CHECK)
  @Post('email-check')
  async emailCheck(@Body() body: EmailCheckReqBodyDto, @Res() res: Response) {
    const response = await this.userService.emailCheck(body);

    return res.status(response.status).json(response.data);
  }

  @Swagger(USER_DOCS.SIGN_IN)
  @Post('sign-in')
  async signIn(@Body() body: SignInReqBodyDto, @Res() res: Response) {
    const response = await this.userService.signIn(body);
    const { user, tokens } = response.data;
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }
}
