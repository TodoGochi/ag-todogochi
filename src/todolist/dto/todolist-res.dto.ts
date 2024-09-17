import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecificDayTodolistResDto {
  @ApiProperty({
    example: 6,
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    example: 'Buy groceries',
    description: 'To-do text',
  })
  todoText: string;

  @ApiProperty({
    example: 'RED',
    description: 'Color tag for the to-do item',
  })
  colorTag: string;

  @ApiProperty({
    description: 'Target date in YYYYMMDD format',
    example: 20240916,
  })
  targetDate: number;

  @ApiProperty({
    example: '11:00',
    description: 'Target time (HH:mm format)',
  })
  targetTime: string;

  @ApiProperty({
    example: 8,
    description: 'To-do ID',
  })
  todoId: number;

  @ApiProperty({
    example: 0,
    description: 'Status of the to-do item (0: Incomplete, 1: Complete)',
  })
  status: number;
}

export class GetTodoListsByDayResDto {
  @ApiProperty({
    type: [CreateSpecificDayTodolistResDto],
    description: 'List of todos for a specific day',
  })
  todos: CreateSpecificDayTodolistResDto[];
}
