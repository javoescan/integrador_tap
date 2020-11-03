import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async login(email: string, password: string): Promise<string> {
    // @TODO: replace this with jwtService.generateJwt()
    return 'mockedjwt';
  }
}