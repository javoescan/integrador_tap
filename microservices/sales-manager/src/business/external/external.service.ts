import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { HttpMethods } from './external.enums';

@Injectable()
export class ExternalService {
  constructor(private httpService: HttpService) {}

  async call(method: HttpMethods, apiUrl: string, body?: object): Promise<any> {
    try {
      const response = await this.httpService[method.toString()](apiUrl, body).toPromise();
      return response.data;
    } catch (e) {
      throw new HttpException(e.response.data.message, e.response.data.statusCode);
    }
  }
}