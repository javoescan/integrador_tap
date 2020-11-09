import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
  private baseApiUrl: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.baseApiUrl = this.configService.get<string>('USERS_MANAGER_API');
  }

  async getAll(): Promise<UserModel[]> {
    const response = await this.httpService.get(this.baseApiUrl).toPromise();
    return response.data;
  }

  async get(id: string): Promise<UserModel> {
    const apiUrl = `${this.baseApiUrl}${id}`;
    const response = await this.httpService.get(apiUrl).toPromise();
    return response.data;
  }

  async login(email: string, password: string): Promise<string> {
    const apiUrl = `${this.baseApiUrl}login`;
    const response = await this.httpService.post(apiUrl, { email, password }).toPromise();
    return response.data;
  }

  async create(user: UserModel): Promise<UserModel> {
    const response = await this.httpService.post(this.baseApiUrl, { user }).toPromise();
    return response.data;
  }
  
  async update(user: UserModel): Promise<UserModel> {
    const response = await this.httpService.put(this.baseApiUrl, { user }).toPromise();
    return response.data;
  }

  async delete(id: string): Promise<string> {
    const apiUrl = `${this.baseApiUrl}${id}`;
    const response = await this.httpService.delete(apiUrl).toPromise();
    return response.data;
  }
}