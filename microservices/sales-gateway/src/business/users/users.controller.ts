import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  getAll(): Promise<UserDto[]> {
    return this.usersService.getAll();
  }

  @UseGuards(AdminAuthGuard)
  @Get(':id')
  get(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.get(id);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return this.usersService.login(email, password);
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.create(userDto);
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserDto> {
    userDto.id = id;
    return this.usersService.update(userDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
