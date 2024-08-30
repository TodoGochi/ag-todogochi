import { IsIn, IsString } from 'class-validator';

export class Environment {
  @IsIn(['production', 'test', 'development'])
  NODE_ENV = process.env.NODE_ENV;

  @IsString()
  SERVICE_NAME = process.env.SERVICE_NAME;
}
