import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailCheckReqBodyDto, SignUpReqBodyDto } from './dto/user-req.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Sign up',
    description: 'type은 email 혹은 kakao 입니다.',
  })
  @Post('sign-up')
  async signUp(@Body() body: SignUpReqBodyDto, @Res() res: Response) {
    const response = await this.userService.signUp(body);
    return res.status(response.status).json(response.data);
  }

  @Post('email-check')
  async emailCheck(@Body() body: EmailCheckReqBodyDto, @Res() res: Response) {
    const response = await this.userService.emailCheck(body);
    return res.status(response.status).json(response.data);
  }
}
