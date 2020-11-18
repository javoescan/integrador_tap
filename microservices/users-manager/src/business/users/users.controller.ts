import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { GetUserCacheInterceptor } from 'cache/interceptors/get-user-cache.interceptor';
import { GetUsersCacheInterceptor } from 'cache/interceptors/get-users-cache.interceptor';
import { InvalidateGetUserCacheInterceptor } from 'cache/interceptors/invalidate-get-user-cache.interceptor';
import { InvalidateGetUsersCacheInterceptor } from 'cache/interceptors/invalidate-get-users-cache.interceptor';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return this.usersService.login(email, password);
  }

  @Get()
  @UseInterceptors(GetUsersCacheInterceptor)
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseInterceptors(GetUserCacheInterceptor)
  get(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  @UseInterceptors(InvalidateGetUsersCacheInterceptor)
  create(@Body('user') user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @UseInterceptors(InvalidateGetUserCacheInterceptor, InvalidateGetUsersCacheInterceptor)
  update(@Body('user') user: User): Promise<User> {
    return this.usersService.update(user);
  }

  @Delete(':id')
  @UseInterceptors(InvalidateGetUserCacheInterceptor, InvalidateGetUsersCacheInterceptor)
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
