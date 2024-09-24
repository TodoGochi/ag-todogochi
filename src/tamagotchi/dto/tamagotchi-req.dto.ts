import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTamagotchiReqDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '타마고', description: 'Tamagotchi Nickname' })
  @IsString()
  nickname: string;
}

export class TamagotchiReqDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Type(() => Number)
  @IsNumber()
  userId: number;
}
