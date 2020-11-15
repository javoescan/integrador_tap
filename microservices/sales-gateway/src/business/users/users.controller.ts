import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminAuthGuard } from 'business/auth/admin.auth.guard';
import { BasicAuthGuard } from 'business/auth/basic.auth.guard';
import { UserLoginDto } from './dtos/login.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(BasicAuthGuard)
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
  login(@Body() user: UserLoginDto): Promise<string> {
    return this.usersService.login(user.email, user.password);
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
