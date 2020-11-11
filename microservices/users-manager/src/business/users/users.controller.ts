import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  create(@Body('user') user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Body('user') user: User): Promise<User> {
    return this.usersService.update(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
