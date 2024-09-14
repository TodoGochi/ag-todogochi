import { plainToClass, Type } from 'class-transformer';
import {
  IsIn,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JwtConfig } from './object-config/jwt.config';

export class Environment {
  @IsIn(['production', 'test', 'development'])
  NODE_ENV = process.env.NODE_ENV;

  @IsString()
  SERVICE_NAME = process.env.SERVICE_NAME;

  @IsNumberString()
  PORT = process.env.SERVICE_PORT;

  @IsString()
  USER_SERVER_ADDR = process.env.USER_SERVER_ADDR;
  @IsString()
  TODOLIST_SERVER_ADDR = process.env.TODOLIST_SERVER_ADDR;

  // JWT
  @ValidateNested()
  @Type(() => JwtConfig)
  JWT: JwtConfig = plainToClass(JwtConfig, {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
}
