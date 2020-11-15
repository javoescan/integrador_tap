import { Injectable } from '@nestjs/common';
import { HttpMethods } from 'business/external/external.enums';
import { productDtoMock } from './products.mocks';

@Injectable()
export class ExternalServiceMock {
  call = async (method: HttpMethods, apiUrl: string) => {
    switch (method) {
      case HttpMethods.POST:
          return productDtoMock;
      case HttpMethods.PUT:
        return productDtoMock;
      case HttpMethods.DELETE:
        return productDtoMock.id;
      case HttpMethods.GET:
        if (apiUrl.includes(productDtoMock.id)) {
          return productDtoMock;
        } else {
          return [productDtoMock];
        }
    }
  }
}