// src/tamagotchi/dto/play-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ExperienceDto } from './experience.dto';
import { LevelEffectDto } from './levelup-effect.dto';

export class PlayResponseDto {
  @ApiProperty({ example: 12, description: 'User ID' })
  @Type(() => Number)
  @IsNumber({}, { message: 'User ID must be a number' })
  user_id: number;

  @ApiProperty({ example: 'egg', description: 'Level of Tamagotchi' })
  @IsString({ message: 'Level must be a string' })
  level: string;

  @ApiProperty({
    example: 'healthy',
    description: 'Health status of Tamagotchi',
  })
  @IsString({ message: 'Health status must be a string' })
  health_status: string;

  @ApiProperty({ example: 'minwoo', description: 'Nickname of Tamagotchi' })
  @IsString({ message: 'Nickname must be a string' })
  nickname: string;

  @ApiProperty({ example: 10, description: 'Happiness level of Tamagotchi' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Happiness must be a number' })
  happiness: number;

  @ApiProperty({ example: '2024-09-22', description: 'Creation date' })
  @IsString({ message: 'Created_at must be a string' })
  created_at: string;

  @ApiProperty({
    example: null,
    description: 'Date when Tamagotchi became sick',
    nullable: true,
  })
  @IsOptional()
  sick_at: string | null;

  @ApiProperty({ example: 1, description: 'Hunger level of Tamagotchi' })
  @Type(() => Number)
  hunger: number;

  @ApiProperty({ example: 100, description: 'Coin balance of user' })
  @Type(() => Number)
  coin: number;

  @ApiProperty({ example: 0, description: 'Amount of coins changed' })
  @Type(() => Number)
  changeAmount: number;
}

export class TamagotchiResDto {
  @ApiProperty({ example: 11, description: 'User ID' })
  @Type(() => Number)
  @IsNumber({}, { message: 'User ID must be a number' })
  user_id: number;

  @ApiProperty({ example: 'egg', description: 'Level of Tamagotchi' })
  @IsString({ message: 'Level must be a string' })
  level: string;

  @ApiProperty({
    example: 'healthy',
    description: 'Health status of Tamagotchi',
  })
  @IsString({ message: 'Health status must be a string' })
  health_status: string;

  @ApiProperty({ example: 'minwoo', description: 'Nickname of Tamagotchi' })
  @IsString({ message: 'Nickname must be a string' })
  nickname: string;

  @ApiProperty({ example: 10, description: 'Happiness level of Tamagotchi' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Happiness must be a number' })
  happiness: number;

  @ApiProperty({ example: '2024-09-22', description: 'Creation date' })
  @IsString({ message: 'Created_at must be a string' })
  created_at: string;

  @ApiProperty({
    example: null,
    description: 'Date when Tamagotchi became sick',
    nullable: true,
  })
  @IsOptional()
  sick_at: string | null;

  @ApiProperty({ example: 0, description: 'Hunger level of Tamagotchi' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Hunger must be a number' })
  hunger: number;

  @ApiProperty({ type: ExperienceDto, description: 'Experience details' })
  @ValidateNested()
  @Type(() => ExperienceDto)
  experience: ExperienceDto;

  @Type(() => LevelEffectDto) // LevelEffect 배열을 변환
  @ApiProperty({ type: [LevelEffectDto], description: '적용된 레벨 효과 목록' })
  levelEffects: LevelEffectDto[];
}
export class LevelUpResDto {
  @ApiProperty({ example: 11, description: 'User ID' })
  @Type(() => Number)
  @IsNumber({}, { message: 'User ID must be a number' })
  user_id: number;

  @ApiProperty({ example: 'egg', description: 'Level of Tamagotchi' })
  @IsString({ message: 'Level must be a string' })
  level: string;

  @ApiProperty({
    example: 'healthy',
    description: 'Health status of Tamagotchi',
  })
  @IsString({ message: 'Health status must be a string' })
  health_status: string;

  @ApiProperty({ example: 'minwoo', description: 'Nickname of Tamagotchi' })
  @IsString({ message: 'Nickname must be a string' })
  nickname: string;

  @ApiProperty({ example: 10, description: 'Happiness level of Tamagotchi' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Happiness must be a number' })
  happiness: number;

  @ApiProperty({ example: '2024-09-22', description: 'Creation date' })
  @IsString({ message: 'Created_at must be a string' })
  created_at: string;

  @ApiProperty({
    example: null,
    description: 'Date when Tamagotchi became sick',
    nullable: true,
  })
  @IsOptional()
  sick_at: string | null;

  @ApiProperty({ example: 0, description: 'Hunger level of Tamagotchi' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Hunger must be a number' })
  hunger: number;

  @Type(() => LevelEffectDto) // LevelEffect 배열을 변환
  @ApiProperty({ type: [LevelEffectDto], description: '적용된 레벨 효과 목록' })
  levelEffects: LevelEffectDto[];
}

export class LevelProgressResDto {
  @ApiProperty({ example: 47, description: '레벨업까지 47시간' })
  hour: number;
  @ApiProperty({ example: 6, description: '레벨업까지 6분' })
  min: number;
}
