import { Injectable } from '@nestjs/common';
import { UserDto } from '../user.dto';
import userDtoMock from './user.mock';

@Injectable()
export class UsersServiceMock {
	async get(id: string): Promise<UserDto> {
		return userDtoMock;
	}
}