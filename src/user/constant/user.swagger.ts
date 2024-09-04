import { SwaggerOptions } from 'src/common/decorators/swagger.decorator';

export const USER_DOCS: Record<string, SwaggerOptions> = {
  USER_CONTROLLER: {
    apiTags: 'User',
  },
  SIGN_UP: {
    operation: {
      summary: 'Sign up',
      description: 'email을 통한 회원가입 입니다.',
    },
  },
  EMAIL_CHECK: {
    operation: {
      summary: 'Email check',
      description: 'email 중복 확인입니다.',
    },
  },
  SIGN_IN: {
    operation: {
      summary: 'Sign in',
      description: 'email을 통한 로그인입니다.',
    },
  },
};
