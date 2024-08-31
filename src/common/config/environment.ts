import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsNumberString, IsString } from 'class-validator';

export class Environment {
  @IsIn(['production', 'test', 'development'])
  NODE_ENV = process.env.NODE_ENV;

  @IsString()
  SERVICE_NAME = process.env.SERVICE_NAME;

  @IsNumberString()
  PORT = process.env.SERVICE_PORT;

  @IsString()
  USER_SERVER_ADDR = process.env.USER_SERVER_ADDR;
}
