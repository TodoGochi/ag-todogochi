import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user-res.dto';

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

export class SignInKakaoResDto extends SignUpResDto {}

export class RefreshAccessTokenResDto extends SignUpResDto {}
