import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class HttpServiceMock {
  post = () => of({ data: '' });
}