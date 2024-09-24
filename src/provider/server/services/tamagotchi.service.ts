import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { HttpGetRequest, HttpPostRequest } from '../utils/server.type';
import { axiosErrorHandler } from 'src/common/util/axios-error.handler';
import { SERVICE_NAME } from '../constants/service-name.constant';

@Injectable()
export class TamagotchiService {
  public serviceName = SERVICE_NAME.TAMAGOTCHI;
  constructor(
    @Inject('TAMAGOTCHI_SERVER')
    private readonly tamagotchiServer: AxiosInstance,
  ) {}

  async get(data: HttpGetRequest) {
    try {
      return await this.tamagotchiServer.get(data.path, data.config);
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }

  async post(data: HttpPostRequest) {
    try {
      return await this.tamagotchiServer.post(
        data.path,
        data.data,
        data.config,
      );
    } catch (error) {
      axiosErrorHandler(error, this.serviceName);
    }
  }
}
