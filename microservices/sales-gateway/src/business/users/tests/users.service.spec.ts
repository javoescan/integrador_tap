import { HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpServiceMock } from '../mocks/http.service.mock';
import { userDtoMock, userJwtMock } from '../mocks/user.mocks';
import { UsersService } from '../users.service';

describe('UsersService', () => {
	let usersService: UsersService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [UsersService, HttpService, ConfigService],
		})
			.overrideProvider(HttpService)
			.useClass(HttpServiceMock)
			.compile();

      usersService = app.get<UsersService>(UsersService);
	});

	describe('getAll', () => {
		it('should return the users collection', async () => {
			expect(await usersService.getAll()).toEqual([userDtoMock]);
		});
	});

	describe('get', () => {
		it('should return the user', async () => {
			expect(await usersService.get(userDtoMock.id)).toEqual(userDtoMock);
		});
	});

	describe('login', () => {
		it('should return the mocked jwt', async () => {
			expect(await usersService.login(userDtoMock.email, userDtoMock.password)).toEqual(userJwtMock);
		});
	});

	describe('create', () => {
		it('should return the created user', async () => {
			expect(await usersService.create(userDtoMock)).toEqual(userDtoMock);
		});
	});

	describe('update', () => {
		it('should return the updated user', async () => {
			expect(await usersService.update(userDtoMock)).toEqual(userDtoMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted user id', async () => {
			expect(await usersService.delete(userDtoMock.id)).toEqual(userDtoMock.id);
		});
  });
  
  describe('delete', () => {
		it('should throw an exception', async () => {
      jest.spyOn(usersService['httpService'], 'delete').mockImplementationOnce(() => {
        throw new HttpException({ data: { message: 'error' } }, HttpStatus.BAD_REQUEST);
      });
			expect(async() => await usersService.delete(userDtoMock.id)).rejects.toThrowError(HttpException);
		});
	});
});
