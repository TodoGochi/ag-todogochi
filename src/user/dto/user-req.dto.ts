import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class UserIdReqParamDto {
  @ApiProperty({ example: 15, description: 'User Id' })
  @Type(() => Number)
  @IsInt()
  userId: number;
}

export class CreateCoinTransactionReqBodyDto {
  @ApiProperty({
    example: 19,
    description: 'ID of the user performing the coin transaction',
  })
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({
    example: -500,
    description:
      'Amount of coin change. Use a negative value for debit and a positive value for credit.',
  })
  @Type(() => Number)
  @IsInt()
  changeAmount: number;

  @ApiProperty({
    example: 'Complete ColorTag: Red',
    description: 'Description of the coin transaction reason',
  })
  @IsString()
  description: string;
}
