import { plainToClass, Type } from 'class-transformer';
import {
  IsIn,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { KakaoAuthConfig } from './object-config/kakao-auth.config';

export class Environment {
  @IsIn(['production', 'test', 'development'])
  NODE_ENV = process.env.NODE_ENV;

  @IsString()
  SERVICE_NAME = process.env.SERVICE_NAME;

  @IsNumberString()
  PORT = process.env.SERVICE_PORT;

  @IsString()
  USER_SERVER_ADDR = process.env.USER_SERVER_ADDR;

  // Kakao Auth
  @ValidateNested()
  @Type(() => KakaoAuthConfig)
  KAKAO_AUTH: KakaoAuthConfig = plainToClass(KakaoAuthConfig, {
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri: process.env.KAKAO_REDIRECT_URI,
  });
}
