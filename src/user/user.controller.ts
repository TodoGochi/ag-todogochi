import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpReqBodyDto } from './dto/user-req.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpReqBodyDto, @Res() res: Response) {
    const response = await this.userService.signUp(body);
    return res.status(response.status).json(response.data);
  }
}
