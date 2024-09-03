import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { SignUpType } from '../constant/sign-up.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'nickname', description: 'nickname' })
  nickName: string;

  @ApiProperty({
    example: 'email',
    description: 'type :: email || kakao || google',
  })
  @IsEnum(SignUpType)
  type: SignUpType;

  @ApiPropertyOptional({
    example: 'password',
    description: 'If the type is email, a password is required.',
  })
  @IsOptional()
  @IsString()
  password: string;
}

export class EmailCheckReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;
}
