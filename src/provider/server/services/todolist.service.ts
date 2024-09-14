import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPostRequest,
  HttpPutRequest,
} from '../utils/server.type';
import { axiosErrorHandler } from 'src/common/util/axios-error.handler';
import { SERVICE_NAME } from '../constants/service-name.constant';

@Injectable()
export class TodoListService {
  public serviceName = SERVICE_NAME.TODOLIST;
  constructor(
    @Inject('TODOLIST_SERVER')
    private readonly todoListServer: AxiosInstance,
  ) {}

  async get(data: HttpGetRequest) {
    try {
      return await this.todoListServer.get(data.path, data.config);
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }

  async post(data: HttpPostRequest) {
    try {
      return await this.todoListServer.post(data.path, data.data, data.config);
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }

  async put(data: HttpPutRequest) {
    try {
      return await this.todoListServer.put(data.path, data.data, data.config);
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }

  async delete(data: HttpDeleteRequest) {
    try {
      return await this.todoListServer.delete(data.path, data.config);
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }
}
