import { HttpStatusCode } from 'axios';

export const ERRORS = {
  'AG-0000': {
    errorCode: 'AG-0000',
    message: 'Unknown error, please contact server administrator',
    statusCode: HttpStatusCode.InternalServerError,
  },
  'AG-0001': {
    errorCode: 'AG-0001',
    message: 'You do not have the required role to access this resource',
    statusCode: HttpStatusCode.Unauthorized,
  },
  'AG-0002': {
    errorCode: 'AG-0002',
    message: 'Invalid access token',
    statusCode: HttpStatusCode.Unauthorized,
  },
  'AG-0003': {
    errorCode: 'AG-0003',
    message: 'Not Enough Coins',
    statusCode: HttpStatusCode.Forbidden,
  },
  'AG-0004': {
    errorCode: 'AG-0004',
    message: 'User Not Found',
    statusCode: HttpStatusCode.NotFound,
  },
  'AG-0005': {
    errorCode: 'AG-0005',
    message: 'Invalid tamagotchi Id',
    statusCode: HttpStatusCode.NotFound,
  },
  'AG-0006': {
    errorCode: 'AG-0006',
    message: 'Tamagotchi Not Found',
    statusCode: HttpStatusCode.NotFound,
  },
};
