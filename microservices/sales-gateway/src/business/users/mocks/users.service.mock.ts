import { Injectable } from '@nestjs/common';
import { UserDto } from '../user.dto';
import { userDtoMock, userJwtMock } from './user.mocks';

@Injectable()
export class UsersServiceMock {
	async getAll(id: string): Promise<UserDto[]> {
		return [userDtoMock];
	}

	async get(id: string): Promise<UserDto> {
		return userDtoMock;
	}

	async login(email: string, password: string): Promise<string> {
		return userJwtMock;
	}

	async create(user: UserDto): Promise<UserDto> {
		return userDtoMock;
	}

	async update(user: UserDto): Promise<UserDto> {
		return userDtoMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}