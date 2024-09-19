import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserIdReqParamDto {
  @ApiProperty({ example: 15, description: 'User Id' })
  @Type(() => Number)
  @IsInt()
  userId: number;
}
