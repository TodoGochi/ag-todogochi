import { SwaggerOptions } from 'src/common/decorators/swagger.decorator';
import {
  EmailCheckResDto,
  RefreshAccessTokenResDto,
  SignInKakaoResDto,
  SignInResDto,
  SignUpResDto,
} from '../dto/auth-res.dto';

export const AUTH_DOCS: Record<string, SwaggerOptions> = {
  AUTH_CONTROLLER: {
    apiTags: 'Auth',
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
  SIGN_IN_KAKAO: {
    operation: {
      summary: 'Sign in with Kakao',
      description: 'This endpoint handles user login via Kakao.',
    },
    response: {
      status: 201,
      type: SignInKakaoResDto,
    },
  },
  REFRESH_ACCESS_TOKEN: {
    operation: {
      summary: 'Refresh access token',
      description: 'This endpoint refreshes the access token.',
    },
    response: {
      status: 201,
      type: RefreshAccessTokenResDto,
    },
  },
};
