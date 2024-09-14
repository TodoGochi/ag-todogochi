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
};
