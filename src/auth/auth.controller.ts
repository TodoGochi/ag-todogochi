import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  EmailCheckReqBodyDto,
  SignInKakaoReqBodyDto,
  SignInReqBodyDto,
  SignUpReqBodyDto,
} from './dto/auth-req.dto';
import { Response, Request } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';
import { AUTH_DOCS } from './constant/auth.swagger';
import { REFRESH_TOKEN_MAX_AGE } from './constant/refresh-token-max-age.constant';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Cookie } from 'src/common/decorators/cookie.decorator';
import { COOKIE } from 'src/common/constants/cookie.constant';
import { AccessTokenGuard } from 'src/common/core/guards/access-token.guard';
import { RolesGuard } from 'src/common/core/guards/role.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/common/constants/role.constant';

const logger = new Logger('AuthController');

@Swagger(AUTH_DOCS.AUTH_CONTROLLER)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Swagger(AUTH_DOCS.SIGN_UP)
  @Post('sign-up')
  async signUp(@Body() body: SignUpReqBodyDto, @Res() res: Response) {
    const response = await this.authService.signUp(body);
    const { user, tokens } = response.data;
    res.cookie(COOKIE.REFRESH, tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    delete user.password;
    delete user.refreshToken;

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }

  @Swagger(AUTH_DOCS.EMAIL_CHECK)
  @Post('email-check')
  async emailCheck(@Body() body: EmailCheckReqBodyDto, @Res() res: Response) {
    const response = await this.authService.emailCheck(body);

    return res.status(response.status).json(response.data);
  }

  @Swagger(AUTH_DOCS.SIGN_IN)
  @Post('sign-in')
  async signIn(@Body() body: SignInReqBodyDto, @Res() res: Response) {
    const response = await this.authService.signIn(body);
    const { user, tokens } = response.data;
    res.cookie(COOKIE.REFRESH, tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    delete user.password;
    delete user.refreshToken;

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }

  @Swagger(AUTH_DOCS.SIGN_IN_KAKAO)
  @Post('sign-in/kakao')
  async signInKakao(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.authService.signInKakao(req.query);
    const { user, tokens } = response.data;
    res.cookie(COOKIE.REFRESH, tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }

  @Swagger(AUTH_DOCS.REFRESH_ACCESS_TOKEN)
  @Post('refresh')
  async refreshAccessToken(
    @Res() res: Response,
    @Cookie(COOKIE.REFRESH) oldRefreshToken: string,
  ) {
    const response = await this.authService.refreshAccessToken({
      oldRefreshToken,
    });
    const { user, tokens } = response.data;
    res.cookie(COOKIE.REFRESH, tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    delete user.password;
    delete user.refreshToken;

    return res.status(response.status).json({
      user,
      accessToken: tokens.accessToken,
    });
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Role(ROLE.MEMBER)
  @Get('test')
  async test(@Req() req: Request) {
    // console.log(req['user']);
    return 'test';
  }
}
