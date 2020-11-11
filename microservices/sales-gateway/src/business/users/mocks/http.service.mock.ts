import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { userDtoMock, userJwtMock } from './user.mocks';

@Injectable()
export class HttpServiceMock {
  post = (apiUrl: string) => {
    if (apiUrl.includes('login')) {
      return of({ data: userJwtMock });
    } else {
      return of({ data: userDtoMock });
    }
  }
  put = () => of({ data: userDtoMock });
  delete = () => of({ data: userDtoMock.id });
  get = (apiUrl: string) => {
    if (apiUrl.includes(userDtoMock.id)) {
      return of({ data: userDtoMock });
    } else {
      return of({ data: [userDtoMock] });
    }
  }
}