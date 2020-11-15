import { ConfigService } from '@nestjs/config';
import { ExternalService } from 'business/external/external.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { HttpMethods } from 'business/external/external.enums';

@Injectable()
export class UsersService {
  private baseApiUrl: string;

  constructor(private externalService: ExternalService, private configService: ConfigService) {
    this.baseApiUrl = this.configService.get<string>('USERS_MANAGER_API');
  }

  async getAll(): Promise<UserDto[]> {
    return this.externalService.call(HttpMethods.GET, this.baseApiUrl);
  }

  async get(id: string): Promise<UserDto> {
    return this.externalService.call(HttpMethods.GET, `${this.baseApiUrl}${id}`);
  }

  async login(email: string, password: string): Promise<string> {
    return this.externalService.call(HttpMethods.POST, `${this.baseApiUrl}login`, { email, password });
  }

  async create(user: UserDto): Promise<UserDto> {
    return this.externalService.call(HttpMethods.POST, this.baseApiUrl, { user });
  }
  
  async update(user: UserDto): Promise<UserDto> {
    return this.externalService.call(HttpMethods.PUT, `${this.baseApiUrl}${user.id}`, { user });
  }

  async delete(id: string): Promise<string> {
    return this.externalService.call(HttpMethods.DELETE, `${this.baseApiUrl}${id}`);
  }
}