import { SwaggerOptions } from 'src/common/decorators/swagger.decorator';
import { CreateSpecificDayTodolistResDto } from '../dto/todolist-res.dto';

export const TODOLIST_DOCS: Record<string, SwaggerOptions> = {
  TODOLIST_CONTROLLER: {
    apiTags: 'Todolist',
  },
  CREATE_SPECIFIC_DAY_TODOLIST: {
    operation: {
      summary: 'Create specific day todolist',
      description: 'This endpoint creates a todolist for a specific day.',
    },
    bearerAuth: true,
    response: {
      status: 201,
      type: CreateSpecificDayTodolistResDto,
    },
  },
  GET_TODOLISTS_BY_DAY: {
    operation: {
      summary: 'Get todo lists by day',
      description:
        'This endpoint retrieves a list of todo lists for a specific day.',
    },
    bearerAuth: true,
    response: {
      status: 200,
      type: [CreateSpecificDayTodolistResDto],
    },
  },
  CREATE_WEEKLY_TODOLIST: {
    operation: {
      summary: 'Create weekly todolist',
      description: 'This endpoint creates a todolist for a week.',
    },
    bearerAuth: true,
    response: {
      status: 201,
      type: [CreateSpecificDayTodolistResDto],
    },
  },
};
