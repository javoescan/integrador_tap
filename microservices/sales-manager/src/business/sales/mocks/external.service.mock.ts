import { Injectable } from '@nestjs/common';
import { HttpMethods } from 'business/external/external.enums';

@Injectable()
export class ExternalServiceMock {
  call = async (method: HttpMethods, apiUrl: string) => {
    switch (method) {
      case HttpMethods.GET:
        return true;
    }
  }
}