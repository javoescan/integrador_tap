import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async login(email: string, password: string): Promise<string> {
    // @TODO: replace this with jwtService.generateJwt()
    return 'mockedjwt';
  }
}