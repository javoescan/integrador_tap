import { Injectable } from '@nestjs/common';
import { HttpMethods } from 'business/external/external.enums';
import { saleDtoMock } from './sales.mocks';

@Injectable()
export class ExternalServiceMock {
  call = async (method: HttpMethods, apiUrl: string) => {
    switch (method) {
      case HttpMethods.POST:
          return saleDtoMock;
      case HttpMethods.PUT:
        return saleDtoMock;
      case HttpMethods.DELETE:
        return saleDtoMock.id;
      case HttpMethods.GET:
        if (apiUrl.includes(saleDtoMock.id)) {
          return saleDtoMock;
        } else {
          return [saleDtoMock];
        }
    }
  }
}