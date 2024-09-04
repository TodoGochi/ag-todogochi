import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { Swagger } from 'src/common/decorators/swagger.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
