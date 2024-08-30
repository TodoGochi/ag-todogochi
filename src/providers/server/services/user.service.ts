import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPostRequest,
  HttpPutRequest,
} from '../utils/server.type';
import { axiosErrorHandler } from 'src/common/utils/axios-error.handler';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVER')
    private readonly userServer: AxiosInstance,
  ) {}

  async get(data: HttpGetRequest) {
    try {
      return await this.userServer.get(data.path, data.config);
    } catch (error) {
      axiosErrorHandler(error);
    }
  }

  async post(data: HttpPostRequest) {
    try {
      return await this.userServer.post(data.path, data.data, data.config);
    } catch (error) {
      axiosErrorHandler(error);
    }
  }

  async put(data: HttpPutRequest) {
    try {
      return await this.userServer.put(data.path, data.data, data.config);
    } catch (error) {
      axiosErrorHandler(error);
    }
  }

  async delete(data: HttpDeleteRequest) {
    try {
      return await this.userServer.delete(data.path, data.config);
    } catch (error) {
      axiosErrorHandler(error);
    }
  }
}
