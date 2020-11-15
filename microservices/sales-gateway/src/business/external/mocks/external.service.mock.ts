import { Injectable } from '@nestjs/common';
import { userDtoMock, userJwtMock } from 'business/users/mocks/user.mocks';
import { HttpMethods } from '../external.enums';

@Injectable()
export class ExternalServiceMock {
  call = async (method: HttpMethods, apiUrl: string) => {
    switch (method) {
      case HttpMethods.POST:
        if (apiUrl.includes('login')) {
          return userJwtMock ;
        } else {
          return userDtoMock;
        }
      case HttpMethods.PUT:
        return userDtoMock;
      case HttpMethods.DELETE:
        return userDtoMock.id;
      case HttpMethods.GET:
        if (apiUrl.includes(userDtoMock.id)) {
          return userDtoMock;
        } else {
          return [userDtoMock];
        }
    }
  }
}