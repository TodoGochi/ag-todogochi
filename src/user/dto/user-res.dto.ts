import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Nickname of the user', example: 'nickname' })
  nickName: string;

  @ApiProperty({ description: 'Sign-up type of the user', example: 'email' })
  signUpType: string;

  @ApiProperty({ description: 'User ID', example: 2 })
  userId: number;

  @ApiProperty({
    description: 'User account creation date',
    example: '2024-09-04T01:27:47.803Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'User account last updated date',
    example: '2024-09-04T01:27:47.803Z',
  })
  updated_at: string;

  @ApiProperty({
    description: 'User account deletion date (null if not deleted)',
    example: null,
  })
  deleted_at: string | null;
}

export class TokensDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyNTQxMzI2NywiZXhwIjoxNzI1NDk5NjY3fQ.W9-X66v8tZx0HD_opF86envhbhqwijNuC6T948loAXQ',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT Refresh Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyNTQxMzI2NywiZXhwIjoxNzI2MDE4MDY3fQ.FnN-s73eAbXJJtkg4xRd7NcGAXf7zQMMDSBmQhZ5qVc',
  })
  refreshToken: string;
}

export class SignUpResDto {
  @ApiProperty({ description: 'User information', type: UserDto })
  user: UserDto;

  @ApiProperty({ description: 'JWT tokens', type: TokensDto })
  tokens: TokensDto;
}

export class SignInResDto extends SignUpResDto {}

export class EmailCheckResDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Email availability',
    example: true,
  })
  isAvailable: boolean;
}
