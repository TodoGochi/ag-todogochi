import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
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

export class TamagotchiParamDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
