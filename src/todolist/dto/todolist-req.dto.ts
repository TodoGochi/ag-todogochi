import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ColorTagType } from '../constant/color-tag.type';
import { Type } from 'class-transformer';

export class CreateSpecificDayTodoListReqBodyDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'Buy groceries', description: 'To-do text' })
  @IsString()
  todoText: string;

  @ApiProperty({ example: 'RED', description: 'Color tag for to-do item' })
  @IsString()
  @Matches(/^(RED|ORANGE|YELLOW|GREEN|BLUE|INDIGO|GRAY)$/, {
    message: 'Invalid color tag',
  })
  colorTag: ColorTagType;

  @ApiProperty({
    description: 'Target date in YYYYMMDD format',
    example: 20240916,
  })
  @IsInt({ message: 'targetDate must be a valid integer' })
  @Matches(/^\d{8}$/, { message: 'targetDate must be in YYYYMMDD format' })
  targetDate: number;

  @ApiProperty({ example: '10:00', description: 'Target time (HH:mm)' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm required)' })
  targetTime: string;
}
