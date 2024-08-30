import { HttpException } from '@nestjs/common';
import { Config } from '../config/config';

const serviceName = Config.getEnvironment().SERVICE_NAME;

export const axiosErrorHandler = (error: any) => {
  if (error.response) {
    responseErrorHandler(error);
  } else if (error.request) {
    requestErrorHandler(error);
  } else {
    throw error;
  }
};

const responseErrorHandler = (error: any) => {
  {
    throw new HttpException(
      {
        errorCode: error.response.data.errorCode || `${serviceName}-0000`,
        message: error.response.data.message || 'Internal Server Error',
      },
      error.response.status || 500,
    );
  }
};

const requestErrorHandler = (error: any) => {
  {
    throw new HttpException(
      {
        errorCode: error.response.data.errorCode || `${serviceName}-0001`,
        message: 'Service Unavailable',
      },
      503,
    );
  }
};
