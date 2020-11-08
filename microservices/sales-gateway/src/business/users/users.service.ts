import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async login(email: string, password: string) {
    const apiUrl = `${this.configService.get<string>('USERS_MANAGER_API')}login`;
    const response = await this.httpService.post(apiUrl, { email, password }).toPromise();
    return response.data;
  }
}