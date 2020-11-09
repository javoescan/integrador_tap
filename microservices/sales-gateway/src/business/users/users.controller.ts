import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserModel } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<UserModel[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.get(id);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string): Promise<string> {
    return this.usersService.login(email, password);
  }

  @Post()
  create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('document') document: string,
    @Body('role') role: string,
  ): Promise<UserModel> {
    try {
      const user = new UserModel(email, password, firstName, lastName, document, role);
      return this.usersService.create(user);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('document') document: string,
    @Body('role') role: string
  ): Promise<UserModel> {
    try {
      const user = new UserModel(email, password, firstName, lastName, document, role, id);
      return this.usersService.create(user);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }
}
