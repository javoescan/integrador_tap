import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private baseApiUrl: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.baseApiUrl = this.configService.get<string>('USERS_MANAGER_API');
  }

  async getAll(): Promise<UserDto[]> {
    return this.executeCall('get', '');
  }

  async get(id: string): Promise<UserDto> {
    return this.executeCall('get', id);
  }

  async login(email: string, password: string): Promise<string> {
    return this.executeCall('post', 'login', { email, password });
  }

  async create(user: UserDto): Promise<UserDto> {
    return this.executeCall('post', '', { user });
  }
  
  async update(user: UserDto): Promise<UserDto> {
    return this.executeCall('put', user.id, { user });
  }

  async delete(id: string): Promise<string> {
    return this.executeCall('delete', id);
  }

  private async executeCall(method: string, endpoint: string, body?: object): Promise<any> {
    const apiUrl = `${this.baseApiUrl}${endpoint}`;
    try {
      const response = await this.httpService[method](apiUrl, body).toPromise();
      return response.data;
    } catch (e) {
      throw new HttpException(e.response.data.message, HttpStatus.BAD_REQUEST);
    }
  }
}