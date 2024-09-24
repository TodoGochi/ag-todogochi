// src/tamagotchi/dto/experience.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ExperienceDto {
  @ApiProperty({ example: 11, description: 'User ID' })
  @Type(() => Number)
  @IsInt({ message: 'User ID must be an integer' })
  user_id: number;

  @ApiProperty({ example: 0, description: 'Feed experience points' })
  @Type(() => Number)
  @IsInt({ message: 'Feed experience must be an integer' })
  feed: number;

  @ApiProperty({ example: 0, description: 'Play experience points' })
  @Type(() => Number)
  @IsInt({ message: 'Play experience must be an integer' })
  play: number;

  @ApiProperty({ example: 0, description: 'Pet experience points' })
  @Type(() => Number)
  @IsInt({ message: 'Pet experience must be an integer' })
  pet: number;
}
