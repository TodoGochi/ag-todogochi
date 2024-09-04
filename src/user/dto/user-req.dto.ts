import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'nickname', description: 'nickname' })
  nickName: string;

  @ApiProperty({
    example: 'password',
    description: 'password',
  })
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
