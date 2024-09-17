import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
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
  @Min(19000101, { message: 'targetDate must be a valid date' })
  @Max(99991231, { message: 'targetDate must be a valid date' })
  @IsInt({ message: 'targetDate must be a valid integer' })
  targetDate: number;

  @ApiProperty({ example: '10:00', description: 'Target time (HH:mm)' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm required)' })
  targetTime: string;
}

export class GetTodoListsByDayReqParamDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 20240916,
    description: 'Target date in YYYYMMDD format',
  })
  @Type(() => Number)
  @IsInt({ message: 'targetDate must be a valid integer' })
  @Min(19000101, { message: 'targetDate must be a valid date' })
  @Max(99991231, { message: 'targetDate must be a valid date' })
  targetDate: number;
}
