import { HttpStatusCode } from 'axios';

export const ERRORS = {
  'USER-0000': {
    errorCode: 'AG-0000',
    message: 'Unknown error, please contact server administrator',
    statusCode: HttpStatusCode.InternalServerError,
  },
};
