import { SwaggerOptions } from 'src/common/decorators/swagger.decorator';
import {
  EmailCheckResDto,
  SignInResDto,
  SignUpResDto,
} from '../dto/user-res.dto';

export const USER_DOCS: Record<string, SwaggerOptions> = {
  USER_CONTROLLER: {
    apiTags: 'User',
  },
  SIGN_UP: {
    operation: {
      summary: 'Sign up',
      description: 'This endpoint handles user registration using email.',
    },
    response: {
      status: 201,
      type: SignUpResDto,
    },
  },
  EMAIL_CHECK: {
    operation: {
      summary: 'Email check',
      description: 'This endpoint checks for email duplication.',
    },
    response: {
      status: 200,
      type: EmailCheckResDto,
    },
  },
  SIGN_IN: {
    operation: {
      summary: 'Sign in',
      description: 'This endpoint handles user login via email.',
    },
    response: {
      status: 201,
      type: SignInResDto,
    },
  },
};
