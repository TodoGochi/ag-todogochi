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

  @ApiProperty({ description: 'User Role', example: 0 })
  role: number;

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
