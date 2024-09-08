import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SignUpReqBodyDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'nickname', description: 'nickname' })
  @IsString()
  @Length(2, 15, { message: 'Nickname must be between 2 and 15 characters.' })
  @Matches(/^[a-zA-Z0-9가-힣]*$/, {
    message:
      'Nickname can only contain letters, numbers, or Korean characters.',
  })
  nickName: string;

  @ApiProperty({
    example: 'password',
    description: 'password',
  })
  @IsString()
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long.',
  })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'Password must include letters, numbers, and special characters.',
  })
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
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long.',
  })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'Password must include letters, numbers, and special characters.',
  })
  password: string;
}
