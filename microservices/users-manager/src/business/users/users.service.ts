import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private authService: AuthService) {}

  async login(email: string, password: string): Promise<string> {
    const existingUser = await this.usersRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email })
      .getOne();
    if (!existingUser) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordValid) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
    return this.authService.generateJwt(existingUser.id, existingUser.email, existingUser.role);
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async get(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ email: user.email });
    if (existingUser) {
			throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const entity = new User();
    entity.email = user.email;
    entity.password = user.password;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.role = user.role;
    entity.document = user.document;
    return this.usersRepository.save(entity);
  }
  
  async update(user: User): Promise<User> {
    const existingUser = await this.get(user.id);
    if (!existingUser) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = {
      ...existingUser,
      ...user,
    };
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: string): Promise<string> {
    await this.usersRepository.softDelete({ id });
    return id;
  }
}