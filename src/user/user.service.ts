import { Injectable } from '@nestjs/common';
import { UserService as UserServer } from 'src/provider/server/services/user.service';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserServer) {}
}
