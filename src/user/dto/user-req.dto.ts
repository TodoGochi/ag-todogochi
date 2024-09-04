import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'nickname', description: 'nickname' })
  nickName: string;

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

export class SignInReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password: string;
}
